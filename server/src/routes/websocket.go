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

var authCodeCache map[string]time.Time

func GenerateWebsocketAuthCode(c *gin.Context) {

	var payload struct {
		Jwt string `json:"jwt" binding:"required"`
	}

	c.ShouldBindJSON(&payload)

	result, err := auth.ParseJWT(payload.Jwt)

	if err != nil {
		responseBody := NewResponseError(400, "failed to parse jwt", "Failed to parse JWT")
		c.JSON(http.StatusInternalServerError, responseBody)
	}

	session, err := database.GetSession(result.SessionID)

	if err != nil {
		responseBody := NewResponseError(400, "Session not found", "Session not found. probably expired?")
		c.JSON(http.StatusInternalServerError, responseBody)
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

	authCodeCache[authID] = time.Now().Add(time.Minute * 5)

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

	if authCodeCache[result.AuthID].Before(time.Now()) {
		responseBody := NewResponseError(400, "JWT is expired", "JWT is expired")
		c.JSON(http.StatusBadRequest, responseBody)
	}

	m.HandleRequest(c.Writer, c.Request)

}
