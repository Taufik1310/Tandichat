package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
	"os"

	"github.com/google/uuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() error {
	dsn := os.Getenv("DB_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		return errors.Join(errors.New("error: Cannot connect to database"), err)
	}

	model.Setup(db)

	if err != nil {
		return errors.Join(errors.New("error: Error at migration"), err)
	}

	DB = db

	return nil
}

func insertUser(user *model.User) error {
	user.UUID = uuid.New().String()

	if err := DB.Create(&user).Error; err != nil {
		return err
	}

	return nil
}
