package routes

import (
	"andiputraw/Tandichat/src/database"

	"github.com/gin-gonic/gin"
)

func GetCurrentlyLoginUser(c *gin.Context) {
	session, err := checkIfuserIsLogged(c)
	if err != nil {
		return
	}

	user, err := database.GetUser(session.UserID)

	if err != nil {
		body := NewResponseError(500, "Failed to get user", err.Error())
		c.JSON(500, body)
		return
	}

	body := gin.H{"code": 200, "message": "Success", "data": user}
	c.JSON(200, body)
}

func GetUser(c *gin.Context) {
	_, err := checkIfuserIsLogged(c)
	if err != nil {
		return
	}

	userID := c.Param("id")

	if userID == "" {
		body := NewResponseError(400, "Bad Request", "User ID is required")
		c.JSON(400, body)
		return
	}

	user, err := database.GetUser(userID)

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
