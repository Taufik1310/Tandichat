package routes

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"andiputraw/Tandichat/src/database"
)

const imagePath = "./static/profile/"

func GetProfilePicture(c *gin.Context) {
	imageName := c.DefaultQuery("name", "default")
	safeImageName := sanitizeFilename(imageName)

	if _, err := os.Stat(imagePath + safeImageName + ".png"); os.IsNotExist(err) {

		c.AbortWithError(http.StatusNotFound, err)
		return

	}
	c.Header("Content-Type", "image/jpeg")
	c.File(imagePath + safeImageName + ".png")
}

func ChangeProfilePicture(c *gin.Context) {
	file, err := c.FormFile("file")
	id := c.Query("id")

	if id == "" {
		c.AbortWithStatusJSON(400, gin.H{"error": "id is required"})
		return
	}

	if !database.IsUserExist(id) {
		c.AbortWithStatusJSON(400, gin.H{"error": "User Does not exist"})
		return
	}
	fmt.Println(err)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !isPng(file.Filename) {
		c.AbortWithStatusJSON(400, gin.H{"error": "file is not png"})
		return
	}

	filename := uuid.New().String()

	fmt.Println(filename)

	c.SaveUploadedFile(file, imagePath+filename+".png")

	if err := database.ChangeProfilePicture(id, filename); err != nil {
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
