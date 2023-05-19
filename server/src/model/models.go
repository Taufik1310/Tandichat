package model

import (
	"gorm.io/gorm"
)

type User struct{
	gorm.Model
	Email string `gorm:"unique"`
	Username string
	Password string
	Img string `gorm:"default:default.png"`
	About string  `gorm:"default:Hello im using tandichat"`
}

type Friend struct{
	gorm.Model
	UserID uint
	User User
	FriendID uint
	Friend User `gorm:"foreignKey:FriendID"`
}

type Room struct{
	gorm.Model
}

type RoomParticipant struct {
	gorm.Model
	UserID uint
	User User
	Room Room
	RoomID uint
}

type Message struct{
	gorm.Model
	User User 
	UserID uint
	Room Room 
	RoomID uint 
	Content string
}

type Session struct{
	gorm.Model
	UserID uint
	User User 
}


func Setup(db *gorm.DB) error{
	err := db.AutoMigrate(&User{}, &Friend{},&Room{},&RoomParticipant{}, &Message{}, &Session{})

	if err != nil {
		return err
	}

	return nil
}