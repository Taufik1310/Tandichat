package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/olahol/melody"

	"andiputraw/Tandichat/src/config"
	"andiputraw/Tandichat/src/database"
	"andiputraw/Tandichat/src/routes"
	"andiputraw/Tandichat/src/websocket"
)

type sendedData struct {
	Data   string
	Target string
}




func main() {
	err := godotenv.Load()
	config.InitConfig()
	if err != nil {
		log.Fatal("error loading .env files")
	}
	err = database.Connect()

	if err != nil {
		log.Fatal(err.Error())
	}

	r := gin.Default()
	m := melody.New()

	wsPool := websocket.NewPool()

	count := 0
	
	log := log.Default()

	

	r.POST("/api/register", routes.Register)
	r.POST("/api/login", routes.Login)
	r.POST("/api/logout", routes.Logout)
	r.GET("/ws", func(ctx *gin.Context) {
		m.HandleRequest(ctx.Writer, ctx.Request)
	})
	r.StaticFS("/static", http.Dir("./static"))
	r.GET("/profile", func(c *gin.Context) {

		imageName := c.DefaultQuery("name","default")
		safeImageName := SanitizeFilename(imageName)
		imagePath := "./static/profile/"

		log.Println("Incoming to /profile")

		if _, err := os.Stat(imagePath + safeImageName + ".png"); os.IsNotExist(err) {
			log.Println("Image not found")

			c.AbortWithError(http.StatusNotFound, err)
			return

		}
		c.Header("Content-Type", "image/jpeg")
		c.File(imagePath + safeImageName + ".png")
	})

	m.HandleConnect(func(s *melody.Session) {
		wsPool.InsertConnection(strconv.Itoa(count), s)
		s.Write([]byte(fmt.Sprintf("You are number %d", count)))
		count += 1
	})

	m.HandleMessage(func(s *melody.Session, msg []byte) {
		var data sendedData

		err := json.Unmarshal(msg, &data)

		if err != nil {
			fmt.Println("Error decoding json")
			return
		}

		fmt.Println(data)

		anotherConnection, err := wsPool.GetConnection(data.Target)

		if err != nil {
			return
		}

		anotherConnection.Write([]byte(data.Data))
	})

	r.Run(":5050")
}

func SanitizeFilename(filename string) string {
	safeFilename := strings.ReplaceAll(filename, "..", "")


	return safeFilename
}