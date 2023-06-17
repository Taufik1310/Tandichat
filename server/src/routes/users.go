package routes

import (
	"andiputraw/Tandichat/src/auth"
	"andiputraw/Tandichat/src/database"

	"github.com/gin-gonic/gin"
)

func GetAllFriends(c *gin.Context) {
	jwt, err := getAuthorization(c)

	if err != nil {
		body := NewResponseError(404, "Authorization failed", err.Error())
		c.JSON(404, body)
	}

	session, err := auth.IsConnectedUserIsValid(jwt)

	if err != nil {
		body := NewResponseError(404, "Authorization failed", err.Error())
		c.JSON(404, body)
	}

	_, err = database.GetAllFriends(session.UserID)
	if err != nil {
		body := NewResponseError(404, "Authorization failed", err.Error())
		c.JSON(404, body)
	}
}
