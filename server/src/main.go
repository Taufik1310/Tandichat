package main

import (
	"encoding/json"
	"fmt"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/olahol/melody"

	"andiputraw/Tandchat/src/config"
	"andiputraw/Tandchat/src/database"
	"andiputraw/Tandchat/src/routes"
	"andiputraw/Tandchat/src/websocket"
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

	

	r.POST("/api/register", routes.Register)
	r.POST("/api/login", routes.Login)
	r.POST("/api/logout", routes.Logout)
	r.GET("/ws", func(ctx *gin.Context) {
		m.HandleRequest(ctx.Writer, ctx.Request)
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
