package database

import (
	"andiputraw/Tandichat/src/config"
	"andiputraw/Tandichat/src/model"
	"errors"
	"fmt"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect(dbms string) error {
	dsn := config.Config.DB_URL

	var db *gorm.DB
	var err error

	if dbms == "postgres" {
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{TranslateError: true})
	} else if dbms == "mysql" {
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{TranslateError: true})

	} else {
		fmt.Println("Error: Database provider not supported")
		fmt.Println("Supported DBMS :")
		fmt.Println("mysql | postgres")

		os.Exit(1)
	}

	if err != nil {
		return errors.Join(errors.New("error: Cannot connect to database"), err)
	}

	err = model.Setup(db)

	if err != nil {
		return errors.Join(errors.New("error: Error at migration"), err)
	}

	DB = db

	return nil
}
