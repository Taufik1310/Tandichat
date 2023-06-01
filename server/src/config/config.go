package config

import "os"

type CONFIG struct {
	SECRET_KEY string
	DB_URL     string
}

var Config CONFIG

func InitConfig() {
	Config.SECRET_KEY = os.Getenv("SECRET_KEY")
	Config.DB_URL = os.Getenv("DB_URL")
}
