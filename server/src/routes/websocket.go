package routes

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/olahol/melody"

	"andiputraw/Tandichat/src/auth"
	"andiputraw/Tandichat/src/database"
)

func GenerateWebsocketAuthCode(c *gin.Context) {

	session, err := checkIfuserIsLogged(c)
	if err != nil {
		return
	}

	authID := uuid.NewString()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"authID":    authID,
		"sessionID": session.UserID,
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))

	if err != nil {
		responseBody := NewResponseError(500, "Failed generate token", "Failed to generate token")
		c.JSON(http.StatusInternalServerError, responseBody)
	}

	err = database.InsertWebsocketCache(authID)

	if err != nil {
		body := NewResponseError(500, "Failed insert cache", "Failed to insert cache")
		c.JSON(http.StatusInternalServerError, body)
		return
	}

	c.JSON(http.StatusCreated, gin.H{"code": 200, "data": gin.H{"websocketAuthCode": tokenString}})
}

func ConnectWebSocket(c *gin.Context, m *melody.Melody) {
	token := c.Query("websocketAuthCode")

	if token == "" {
		responseBody := NewResponseError(400, "JWT is required", "JWT is required")
		c.JSON(http.StatusBadRequest, responseBody)
		return
	}

	//parse jwt
	result, err := auth.ParseWebsocketAuthJWT(token)

	if err != nil {
		responseBody := NewResponseError(400, "JWT is invalid", err.Error())
		c.JSON(http.StatusBadRequest, responseBody)
	}

	createdSessionTime, err := database.GetWebsocketCache(result.AuthID)

	if err != nil {
		body := NewResponseError(500, "Failed get cache", err.Error())
		c.JSON(http.StatusInternalServerError, body)
	}

	createdSessionTime = createdSessionTime.Add(time.Minute * 5)

	if createdSessionTime.Before(time.Now()) {
		responseBody := NewResponseError(400, "JWT is expired", "JWT is expired")
		c.JSON(http.StatusBadRequest, responseBody)
	}

	m.HandleRequest(c.Writer, c.Request)

}
