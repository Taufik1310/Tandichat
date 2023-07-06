package config

import (
	"log"
	"os"
	"strconv"
)

/*
EMAIL_VERIFICATION=1
EMAIL_FROM=admin@admin.com
SMTP_HOST=smtp.mailtrap.io
SMTP_USER=
SMTP_PASS=
SMTP_PORT=587
*/

type CONFIG struct {
	SECRET_KEY            string
	DB_URL                string
	MESSAGE_LIMIT         int
	IS_EMAIL_VERIFICATION bool
	EMAIL_FROM            string
	CLIENT_ORIGIN         string
	SMTP_HOST             string
	SMTP_USER             string
	SMTP_PASS             string
	SMTP_PORT             int
}

var Config CONFIG

func InitConfig() {
	Config.SECRET_KEY = os.Getenv("SECRET_KEY")
	Config.DB_URL = os.Getenv("DB_URL")
	msgLimit, err := strconv.Atoi(os.Getenv("MESSAGE_LIMIT"))
	if err != nil {
		log.Fatal("error: Message Limit is not integer")
	}
	Config.MESSAGE_LIMIT = msgLimit

	is_verification_active, err := strconv.Atoi(os.Getenv("EMAIL_VERIFICATION"))

	if err != nil {
		log.Fatal("error: EMAIL_VERIFICATION is not integer. use 1 for true or 0 for false")
	}

	if is_verification_active == 1 {
		Config.IS_EMAIL_VERIFICATION = true
		Config.EMAIL_FROM = os.Getenv("EMAIL_FROM")
		Config.CLIENT_ORIGIN = os.Getenv("CLIENT_ORIGIN")
		Config.SMTP_HOST = os.Getenv("SMTP_HOST")
		Config.SMTP_USER = os.Getenv("SMTP_USER")
		smtpPort, err := strconv.Atoi(os.Getenv("SMTP_PORT"))

		if err != nil {
			log.Fatal("error: SMTP_PORT is not integer")
		}
		Config.SMTP_PORT = smtpPort
		Config.SMTP_PASS = os.Getenv("SMTP_PASS")

	}
}
