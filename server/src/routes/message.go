package routes

import (
	"andiputraw/Tandichat/src/database"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetMessage(c *gin.Context) {
	session, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	to := c.Query("to")
	cursor := c.DefaultQuery("cursor", "0")

	if to == "" {
		body := NewResponseError(http.StatusBadRequest, "Message Destination is not given", "Message Destination is not given")
		c.JSON(http.StatusBadRequest, body)
		return
	}

	safe_to, err := strconv.ParseUint(to, 10, 64)

	if err != nil {
		body := NewResponseError(http.StatusBadRequest, "Message Destination is not unsigned int", err.Error())
		c.JSON(http.StatusBadRequest, body)
		return
	}

	safe_cursor, err := strconv.ParseUint(cursor, 10, 64)

	if err != nil {
		body := NewResponseError(http.StatusBadRequest, "Cursor is not unsigned int", err.Error())
		c.JSON(http.StatusBadRequest, body)
		return
	}

	messages, next_cursor, err := database.GetMessage(session.UserID, uint(safe_to), uint(safe_cursor))

	body := gin.H{"status": 200, "message": "success", "data": gin.H{"message": messages, "next_cursor": next_cursor}}
	c.JSON(http.StatusOK, body)
}
