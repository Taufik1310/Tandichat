package routes

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"andiputraw/Tandichat/src/database"
)

const imagePath = "./static/profile/"

func ChangeAvatar(c *gin.Context) {

	session, err := checkIfuserIsLogged(c)

	if err != nil {
		return
	}

	file, err := c.FormFile("avatar")

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !isPng(file.Filename) && !isGif(file.Filename) {
		c.AbortWithStatusJSON(400, gin.H{"error": "file should be png or gif"})
		return
	}

	filename := uuid.New().String()

	if isPng(file.Filename) {
		c.SaveUploadedFile(file, imagePath+filename+".png")
	} else {
		c.SaveUploadedFile(file, imagePath+filename+".gif")
	}

	if err := database.ChangeProfilePicture(session.UserID, filename); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	c.JSON(200, gin.H{"status": "200", "message": "success", "data": gin.H{"filename": filename}})
}

func sanitizeFilename(filename string) string {
	safeFilename := strings.ReplaceAll(filename, "..", "")

	return safeFilename
}

func isPng(filename string) bool {
	return strings.HasSuffix(filename, ".png")
}

func isGif(filename string) bool {
	return strings.HasSuffix(filename, ".gif")
}
