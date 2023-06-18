package routes

import (
	"andiputraw/Tandichat/src/database"

	"github.com/gin-gonic/gin"
)

func GetAllFriends(c *gin.Context) {
	session, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	friends, err := database.GetAllFriends(session.UserID)

	if err != nil {
		body := NewResponseError(500, "Failed to get friend requests", err.Error())
		c.JSON(500, body)
		return
	}

	response := gin.H{"code": 200, "message": "Success", "data": friends}

	c.JSON(200, response)

}

func GetPendingFriendRequests(c *gin.Context) {
	session, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	friends, recieved, err := database.GetPendingRequest(session.UserID)

	if err != nil {
		body := NewResponseError(500, "Failed to get pending friend requests", err.Error())
		c.JSON(500, body)
		return
	}

	response := gin.H{"code": 200, "message": "Success", "data": gin.H{"sended": friends, "recieved": recieved}}

	c.JSON(200, response)

}

func RequestAddFriend(c *gin.Context) {
	sessions, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	var requestData struct {
		Friendid uint `json:"friendid" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		body := NewResponseError(400, "Bad Request", err.Error())
		c.JSON(400, body)
		return
	}

	if err := database.RequestAddFriend(sessions.UserID, requestData.Friendid); err != nil {
		body := NewResponseError(500, "Failed to add friend", err.Error())
		c.JSON(500, body)
		return
	}

	c.JSON(200, gin.H{"code": "200", "message": "Success"})

}

func AcceptFriendRequest(c *gin.Context) {
	sessions, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	var requestData struct {
		Friendid uint `json:"friendid" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		body := NewResponseError(400, "Bad Request", err.Error())
		c.JSON(400, body)
		return
	}

	if err := database.AcceptFriendRequest(sessions.UserID, requestData.Friendid); err != nil {
		body := NewResponseError(500, "Failed to accept friend", err.Error())
		c.JSON(500, body)
		return
	}

	c.JSON(200, gin.H{"code": "200", "message": "Success"})

}
