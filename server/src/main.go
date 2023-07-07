package main

import (
	"andiputraw/Tandichat/src/config"
	"andiputraw/Tandichat/src/database"
	logger "andiputraw/Tandichat/src/log"
	"andiputraw/Tandichat/src/routes"
	"andiputraw/Tandichat/src/websocket"
	"flag"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/olahol/melody"
)

var address = ""
var dbms = "postgres"

func main() {
	logger.Init()
	flag.StringVar(&address, "address", "127.0.0.1:5050", "Address")
	flag.StringVar(&dbms, "db", "postgres", "Select database provider. mysql | posgres")

	flag.Parse()

	err := godotenv.Load()
	config.InitConfig()
	if err != nil {
		log.Fatal("error loading .env files")
	}
	err = database.Connect(dbms)

	if err != nil {
		log.Fatal(err.Error())
	}

	r := gin.Default()

	m := melody.New()

	m.Config.MaxMessageSize = 4096
	m.Config.MessageBufferSize = 4096

	config := cors.DefaultConfig()

	config.AllowOrigins = []string{"*"}
	config.AllowCredentials = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}

	r.Use(cors.New(config))
	//* API AUTH
	r.POST("/api/register", routes.Register)
	r.POST("/api/login", routes.Login)
	r.POST("/api/logout", routes.Logout)
	r.POST("/api/verifyemail", routes.SendVerificationCode)
	r.PATCH("/api/verifyemail/:code", routes.VerifyEmail)

	//* API AVATAR
	r.PATCH("/api/avatar", routes.ChangeAvatar)

	//* API FRIEND
	r.GET("/api/friends", routes.GetAllFriends)
	r.DELETE("/api/friends", routes.DeleteFriend)
	r.POST("/api/friends/request", routes.RequestAddFriend(m))
	r.POST("/api/friends/accept", routes.AcceptFriendRequest)
	r.POST("/api/friends/cancel", routes.CancelFriendRequest)
	r.POST("/api/friends/decline", routes.RejectFriendRequest)
	r.GET("/api/friends/pending", routes.GetPendingFriendRequests)

	//* API USER
	r.GET("/api/user", routes.GetUser)
	r.PATCH("/api/user/username", routes.ChangeUsername)
	r.PATCH("/api/user/about", routes.ChangeAbout)
	r.POST("/api/user/block", routes.BlockUser)
	r.DELETE("/api/user/block", routes.UnBlockUser)
	r.GET("/api/user/block", routes.GetBlockedUsers)

	r.GET("/ws/auth", routes.GenerateWebsocketAuthCode)
	r.GET("/ws/connect", routes.ConnectWebSocket(m))

	//* API MESSAGE
	r.GET("/api/message", routes.GetMessage)

	r.StaticFS("/static", http.Dir("static"))

	m.HandleConnect(websocket.HandleConnect)
	m.HandleMessage(websocket.HandleMessage(m))
	m.HandleError(func(s *melody.Session, err error) {
		logger.Warning("Connection disconnected: ", err.Error())
	})
	m.HandleClose(func(s1 *melody.Session, i int, s2 string) error {
		key, ok := s1.Get("id")

		if !ok {
			key = "[no id found]"
		}

		logger.Info("Connection closed. ID :", key, "i : ", i, "s2 : ", s2)
		return nil
	})

	logger.Info("Listening and serving HTTP on : ", address)
	r.Run(address)
}
