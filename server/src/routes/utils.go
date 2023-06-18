package routes

import (
	"andiputraw/Tandichat/src/auth"
	"errors"

	"github.com/gin-gonic/gin"
)

func getAuthorization(c *gin.Context) (string, error) {
	authHeader := c.GetHeader("Authorization")

	if authHeader == "" {
		return "", errors.New("error: Authorization header not found")
	}

	return authHeader, nil
}

func checkIfuserIsLogged(c *gin.Context) (*auth.JWTStructure, error) {
	jwt, err := getAuthorization(c)

	if err != nil {
		body := NewResponseError(404, "Authorization failed", err.Error())
		c.JSON(404, body)
		return &auth.JWTStructure{}, errors.New("error: Authorization failed")
	}

	session, err := auth.IsConnectedUserIsValid(jwt)

	if err != nil {
		body := NewResponseError(404, "Authorization failed", err.Error())
		c.JSON(404, body)
		return &auth.JWTStructure{}, errors.New("error: Authorization failed")
	}
	return session, nil
}
