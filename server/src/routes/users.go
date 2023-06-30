package routes

import (
	"andiputraw/Tandichat/src/database"

	"github.com/gin-gonic/gin"
)

func GetUser(c *gin.Context) {
	session, err := checkIfuserIsLogged(c)
	if err != nil {
		return
	}

	userID := c.Query("id")
	email := c.Query("email")
	var user *database.User

	if userID != "" {
		user, err = database.GetUser(session.UserID, userID)
	} else if email != "" {
		user, err = database.GetUserByEmail(email, session.UserID)
	} else {
		user, err = database.GetUser(session.UserID, session.UserID)
	}

	if err != nil {
		body := NewResponseError(500, "Failed to get user", err.Error())
		c.JSON(500, body)
		return
	}

	body := gin.H{"code": 200, "message": "Success", "data": user}
	c.JSON(200, body)
}

func ChangeUsername(c *gin.Context) {
	session, err := checkIfuserIsLogged(c)
	if err != nil {
		return
	}

	var req_body struct {
		New_username string `json:"new_username" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req_body); err != nil {
		req_body := NewResponseError(400, "Bad Request", err.Error())
		c.JSON(400, req_body)
		return
	}

	if req_body.New_username == "" {
		req_body := NewResponseError(400, "Bad Request", "Username cannot be empty")
		c.JSON(400, req_body)
		return
	}

	if err := database.ChangeUsername(session.UserID, req_body.New_username); err != nil {
		req_body := NewResponseError(500, "Failed to change username", err.Error())
		c.JSON(500, req_body)
		return
	}

	body := gin.H{"code": 200, "message": "Success"}
	c.JSON(200, body)
}

func ChangeAbout(c *gin.Context) {
	session, err := checkIfuserIsLogged(c)
	if err != nil {
		return
	}

	var req_body struct {
		New_about string `json:"new_about" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req_body); err != nil {
		req_body := NewResponseError(400, "Bad Request", err.Error())
		c.JSON(400, req_body)
		return
	}

	if req_body.New_about == "" {
		req_body := NewResponseError(400, "Bad Request", "Username cannot be empty")
		c.JSON(400, req_body)
		return
	}

	if err := database.ChangeAbout(session.UserID, req_body.New_about); err != nil {
		req_body := NewResponseError(500, "Failed to change username", err.Error())
		c.JSON(500, req_body)
		return
	}

	body := gin.H{"code": 200, "message": "Success"}
	c.JSON(200, body)
}

func BlockUser(c *gin.Context) {
	session, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	var req_body struct {
		Blocked_user_id uint `json:"blocked_user_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req_body); err != nil {
		body := NewResponseError(400, "Bad Request", err.Error())
		c.JSON(404, body)
		return
	}

	if err := database.BlockUser(session.UserID, req_body.Blocked_user_id); err != nil {
		body := NewResponseError(404, "Failed to block user", err.Error())
		c.JSON(404, body)
		return
	}

	body := gin.H{"code": 200, "message": "Success"}
	c.JSON(200, body)
}

func UnBlockUser(c *gin.Context) {
	session, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	var req_body struct {
		Blocked_user_id uint `json:"blocked_user_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req_body); err != nil {
		body := NewResponseError(400, "Bad Request", err.Error())
		c.JSON(404, body)
		return
	}

	if err := database.UnBlockUser(session.UserID, req_body.Blocked_user_id); err != nil {
		body := NewResponseError(404, "Failed to block user", err.Error())
		c.JSON(404, body)
		return
	}

	body := gin.H{"code": 200, "message": "Success"}
	c.JSON(200, body)
}

func GetBlockedUsers(c *gin.Context) {
	sessions, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	blockedUser, err := database.GetBlockedUser(sessions.UserID)

	if err != nil {
		body := NewResponseError(404, "Failed to get blocked users", err.Error())
		c.JSON(404, body)
		return
	}

	body := gin.H{"code": 200, "message": "success", "data": blockedUser}
	c.JSON(200, body)
}
