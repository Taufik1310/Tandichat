package main

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/olahol/melody"

	"github.com/andiputraw/Tandichat/server/src/websocket"
)

type sendedData struct {
	Data string
	Target string
}

func main(){
	r := gin.Default()
	m := melody.New()

	wsPool := websocket.NewPool()

	count := 0

	r.GET("/",func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"Message" : "Pong",
		})
	})

	r.GET("/ws", func(ctx *gin.Context) {
		m.HandleRequest(ctx.Writer, ctx.Request)
	})

	m.HandleConnect(func(s *melody.Session) {
		wsPool.InsertConnection(strconv.Itoa(count), s)
		s.Write([]byte(fmt.Sprintf("You are number %d" , count)))
		count+= 1
	})

	m.HandleMessage(func(s *melody.Session, msg []byte) {
		var data sendedData

		err := json.Unmarshal(msg,&data)

		if err != nil {
			fmt.Println("Error decoding json")
			return
		}

		fmt.Println(data)

		anotherConnection , err := wsPool.GetConnection(data.Target)

		if err != nil {
			return
		}

		anotherConnection.Write([]byte(data.Data))
	})

	r.Run(":5050")
}