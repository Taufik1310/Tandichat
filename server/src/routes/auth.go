package routes

import (
	"net/http"

	"andiputraw/Tandichat/src/auth"
	"andiputraw/Tandichat/src/config"
	"andiputraw/Tandichat/src/database"
	"andiputraw/Tandichat/src/log"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	type requestData struct {
		Email    string `json:"email" binding:"required"`
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	body, err := bindJSON[requestData](c)

	if err != nil {
		return
	}

	err = auth.Register(body.Username, body.Email, body.Password)

	if err != nil {

		response := gin.H{"error": err.Error(), "data": nil, "status": 500}

		c.JSON(http.StatusInternalServerError, response)
		return
	}

	c.JSON(http.StatusCreated, gin.H{"code": 200})
	log.Info("Created new account with email : ", body.Email)
}

func Login(c *gin.Context) {
	type requestData struct {
		Email    string `json:"Email" binding:"required"`
		Password string `json:"Password" binding:"required"`
	}

	body, err := bindJSON[requestData](c)

	if err != nil {
		return
	}

	token, err := auth.Login(body.Email, body.Password)

	if err != nil {
		response := gin.H{"code": http.StatusBadRequest, "data": nil, "error": "Failed to login", "details": err.Error()}
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := gin.H{"code": http.StatusOK, "data": gin.H{"Token": token}}
	c.JSON(http.StatusOK, response)

	log.Info("User with : ", body.Email, "Logged in")
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

func SendVerificationCode(c *gin.Context) {
	type requestData struct {
		Email string `json:"email" binding:"required"`
	}

	body, err := bindJSON[requestData](c)
	if err != nil {
		return
	}

	code, err := database.CreateVerifyAuthCode(body.Email)

	if err != nil {
		response := NewResponseError(400, "Failed create auth code", err.Error())
		c.JSON(400, response)
		return
	}

	data := EmailData{
		URL:       config.Config.CLIENT_ORIGIN + "/api/verifyemail/" + code,
		FirstName: body.Email,
		Subject:   "Your account verification code",
	}

	go SendEmail(body.Email, &data)

	c.JSON(200, gin.H{"code": 200, "message": "success"})

	log.Info("User with : ", body.Email, "sended verification email")
}

func VerifyEmail(c *gin.Context) {
	code := c.Param("code")

	if code == "" {
		response := NewResponseError(400, "Failed verify email", "code is not provided")
		c.JSON(400, response)
		return
	}

	err := database.VerifyAuthCode(code)

	if err != nil {
		response := NewResponseError(400, "Failed verify email", "code invalid")
		c.JSON(400, response)

		return
	}

	c.JSON(200, gin.H{"code": 200, "message": "success"})

}

func NewResponseError(statusCode int, whyError string, detail string) gin.H {
	return gin.H{"code": statusCode, "data": nil, "error": whyError, "details": detail}
}
