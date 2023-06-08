package routes

import (
	"net/http"

	"andiputraw/Tandichat/src/auth"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var requestData struct {
		Email    string `json:"email" binding:"required"`
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		response := gin.H{"code": http.StatusBadRequest, "data": nil, "error": "invalid payload", "details": "Invalid request payload"}
		c.JSON(http.StatusBadRequest, response)
		return
	}

	err := auth.Register(requestData.Username, requestData.Email, requestData.Password)

	if err != nil {
		response := gin.H{"error": err.Error()}
		c.JSON(http.StatusInternalServerError, response)
		return
	}

	c.JSON(http.StatusCreated, gin.H{"code": 200})
}

func Login(c *gin.Context) {
	var requestData struct {
		Email    string `json:"Email" binding:"required"`
		Password string `json:"Password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		response := gin.H{"code": http.StatusBadRequest, "data": nil, "error": "Invalid payload", "details": "Invalid request payload"}
		c.JSON(http.StatusBadRequest, response)
		return
	}

	token, err := auth.Login(requestData.Email, requestData.Password)

	if err != nil {
		response := gin.H{"code": http.StatusBadRequest, "data": nil, "error": "Failed to login", "details": err.Error()}
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := gin.H{"code": http.StatusOK, "data": gin.H{"Token": token}}
	c.JSON(http.StatusOK, response)
}

func Logout(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		response := NewResponseError(http.StatusBadRequest, "Authorization header not provided", "Please add authorization to the header")
		c.JSON(http.StatusBadRequest, response)
		return
	}

	err := auth.Logout(authHeader)

	if err != nil {
		response := NewResponseError(http.StatusBadRequest, "Failed to logout", err.Error())
		c.JSON(http.StatusBadRequest, response)
		return
	}

	c.JSON(http.StatusOK, gin.H{"code": 200})
}

func NewResponseError(statusCode int, whyError string, detail string) gin.H {
	return gin.H{"code": statusCode, "data": nil, "error": whyError, "details": detail}
}