package database

import (
	"errors"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"andiputraw/Tandchat/src/model"
)

var DB *gorm.DB


func Connect() (error){
	dsn := os.Getenv("DB_URL") 
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {	
		return  errors.Join(errors.New("error: Cannot connect to database"), err) 
	}

	model.Setup(db)

	if err != nil {	
		return  errors.Join(errors.New("error: Error at migration"), err) 
	}

	DB = db

	return  nil
}



