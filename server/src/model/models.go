package model

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	UUID      string `gorm:"primaryKey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	Email     string         `gorm:"unique"`
	Username  string
	Password  string
	Img       string `gorm:"default:default.png"`
	About     string `gorm:"default:Hello im using tandichat"`
}

type Friend struct {
	gorm.Model
	UserUUID   string
	User       User
	FriendUUID uint
	Friend     User `gorm:"foreignKey:FriendUUID"`
}

type Room struct {
	gorm.Model
}

type RoomParticipant struct {
	gorm.Model
	UserUUID string
	User     User
	Room     Room
	RoomID   uint
}

type Message struct {
	gorm.Model
	User     User
	UserUUID string
	Room     Room
	RoomID   uint
	Content  string
}

type Session struct {
	gorm.Model
	UserUUID string
	User     User
}

func Setup(db *gorm.DB) error {
	err := db.AutoMigrate(&User{}, &Friend{}, &Room{}, &RoomParticipant{}, &Message{}, &Session{})

	if err != nil {
		return err
	}

	return nil
}
