package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
	"fmt"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() error {
	dsn := os.Getenv("DB_URL")

	var DBMS string
	if len(os.Args) < 2 {
		DBMS = "postgres"
	} else {
		DBMS = os.Args[1]
	}

	var db *gorm.DB
	var err error

	if DBMS == "postgres" {
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	} else if DBMS == "mysql" {
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

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
