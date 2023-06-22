package routes

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"andiputraw/Tandichat/src/database"
)

const imagePath = "./static/profile/"

func GetAvatar(c *gin.Context) {
	imageName := c.DefaultQuery("name", "default")
	safeImageName := sanitizeFilename(imageName)

	if _, err := os.Stat(imagePath + safeImageName + ".png"); os.IsNotExist(err) {

		c.AbortWithError(http.StatusNotFound, err)
		return

	}
	c.Header("Content-Type", "image/jpeg")
	c.File(imagePath + safeImageName + ".png")
}

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

	if !isPng(file.Filename) {
		c.AbortWithStatusJSON(400, gin.H{"error": "file is not png"})
		return
	}

	filename := uuid.New().String()

	c.SaveUploadedFile(file, imagePath+filename+".png")

	if err := database.ChangeProfilePicture(session.ID, filename); err != nil {
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
