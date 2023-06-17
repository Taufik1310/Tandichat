package main

import (
	"andiputraw/Tandichat/src/config"
	"andiputraw/Tandichat/src/database"
	"andiputraw/Tandichat/src/routes"
	"andiputraw/Tandichat/src/websocket"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/olahol/melody"
)

// * PROTOTYPE
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

	config := cors.DefaultConfig()

	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowCredentials = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}

	r.Use(cors.New(config))
	r.POST("/api/register", routes.Register)
	r.POST("/api/login", routes.Login)
	r.POST("/api/logout", routes.Logout)
	r.GET("/profile", routes.GetProfilePicture)
	r.POST("/profile", routes.ChangeProfilePicture)
	r.GET("/api/friends", routes.GetAllFriends)

	r.GET("/ws/connect", func(ctx *gin.Context) {
		m.HandleRequest(ctx.Writer, ctx.Request)
	})

	//TODO Delete this
	r.StaticFS("/static", http.Dir("./static"))

	//* PROTOTYPE
	m.HandleConnect(func(s *melody.Session) {
		wsPool.InsertConnection(strconv.Itoa(count), s)
		s.Write([]byte(fmt.Sprintf("You are number %d", count)))
		count += 1
	})

	//* PROTOTYPE
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
