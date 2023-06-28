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

	friends, received, err := database.GetPendingRequest(session.UserID)

	if err != nil {
		body := NewResponseError(500, "Failed to get pending friend requests", err.Error())
		c.JSON(500, body)
		return
	}

	response := gin.H{"code": 200, "message": "Success", "data": gin.H{"sended": friends, "received": received}}

	c.JSON(200, response)

}

func RequestAddFriend(c *gin.Context) {
	sessions, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	var requestData struct {
		Friend_id uint `json:"friend_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		body := NewResponseError(400, "Bad Request", err.Error())
		c.JSON(400, body)
		return
	}

	if err := database.RequestAddFriend(sessions.UserID, requestData.Friend_id); err != nil {
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
		Friend_id uint `json:"friend_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		body := NewResponseError(400, "Bad Request", err.Error())
		c.JSON(400, body)
		return
	}

	if err := database.AcceptFriendRequest(sessions.UserID, requestData.Friend_id); err != nil {
		body := NewResponseError(500, "Failed to accept friend", err.Error())
		c.JSON(500, body)
		return
	}

	c.JSON(200, gin.H{"code": "200", "message": "Success"})

}

func RejectFriendRequest(c *gin.Context) {
	sessions, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	var requestData struct {
		Friend_id uint `json:"friend_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		body := NewResponseError(400, "Bad Request", err.Error())
		c.JSON(400, body)
		return
	}

	if err := database.DeclineFriendRequest(sessions.UserID, requestData.Friend_id); err != nil {
		body := NewResponseError(500, "Failed to decline friend", err.Error())
		c.JSON(500, body)
		return
	}

	body := gin.H{"code": "200", "message": "Success"}
	c.JSON(200, body)

}

func DeleteFriend(c *gin.Context) {
	session, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	type Data struct {
		Friend_id uint `json:"friend_id" binding:"required"`
	}

	data, err := bindJSON[Data](c)
	if err != nil {
		return
	}

	if err := database.DeleteFriend(session.UserID, data.Friend_id); err != nil {
		body := NewResponseError(500, "Failed to delete friend", err.Error())
		c.JSON(500, body)
		return
	}

	c.JSON(200, gin.H{"code": "200", "message": "Success"})

}

func CancelFriendRequest(c *gin.Context) {
	session, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	var requestData struct {
		Friend_id uint `json:"friend_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		body := NewResponseError(400, "Bad Request", err.Error())
		c.JSON(400, body)
		return
	}

	if err := database.CancelFriendRequest(session.UserID, requestData.Friend_id); err != nil {
		body := NewResponseError(500, "Failed to decline friend", err.Error())
		c.JSON(500, body)
		return
	}

	body := gin.H{"code": "200", "message": "Success"}
	c.JSON(200, body)
}
