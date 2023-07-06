package routes

import (
	"andiputraw/Tandichat/src/auth"
	"andiputraw/Tandichat/src/config"
	"bytes"
	"crypto/tls"
	"errors"
	"html/template"
	"log"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/k3a/html2text"
	"gopkg.in/gomail.v2"
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

func bindJSON[T any](c *gin.Context) (*T, error) {
	var data T
	if err := c.ShouldBindJSON(&data); err != nil {
		req_body := NewResponseError(400, "Bad Request", err.Error())
		c.JSON(400, req_body)
		return &data, err
	}

	return &data, nil
}

type EmailData struct {
	URL       string
	FirstName string
	Subject   string
}

func ParseTemplateDir(dir string) (*template.Template, error) {
	var paths []string
	err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			paths = append(paths, path)
		}
		return nil
	})

	if err != nil {
		return nil, err
	}

	return template.ParseFiles(paths...)
}

func SendEmail(email_destination string, data *EmailData) {
	from := config.Config.EMAIL_FROM
	smtpPass := config.Config.SMTP_PASS
	smtpUser := config.Config.SMTP_USER
	to := email_destination
	smtpHost := config.Config.SMTP_HOST
	smtpPort := config.Config.SMTP_PORT

	var body bytes.Buffer

	template, err := ParseTemplateDir("templates")
	if err != nil {
		log.Fatal("Could not parse template", err)
		return
	}

	template.ExecuteTemplate(&body, "verification_code.html", &data)

	m := gomail.NewMessage()

	m.SetHeader("From", from)
	m.SetHeader("To", to)
	m.SetHeader("Subject", data.Subject)
	m.SetBody("text/html", body.String())
	m.AddAlternative("text/plain", html2text.HTML2Text(body.String()))

	d := gomail.NewDialer(smtpHost, smtpPort, smtpUser, smtpPass)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	// Send Email
	if err := d.DialAndSend(m); err != nil {
		log.Println("Could not send email: ", err)
	}

}
