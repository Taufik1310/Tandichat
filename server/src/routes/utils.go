package routes

import (
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
