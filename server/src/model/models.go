package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email    string `gorm:"unique"`
	Username string `gorm:"type:varchar(100);"`
	Password string `gorm:"type:varchar(100);"`
	Img      string `gorm:"default:default.png"`
	About    string `gorm:"default:Hello im using tandichat"`
}

type Session struct {
	gorm.Model
	UserID uint
	User   User
}

type Friend struct {
	gorm.Model
	UserID   uint `gorm:"uniqueIndex:idx_friend"`
	User     User
	FriendID uint `gorm:"uniqueIndex:idx_friend"`
	Friend   User `gorm:"foreignKey:FriendID"`
	Status   string
}

type Room struct {
	gorm.Model
}

type RoomParticipant struct {
	gorm.Model
	UserID string
	User   User
	Room   Room
	RoomID uint
}

type Message struct {
	gorm.Model
	User    User
	UserID  uint
	Room    Room
	RoomID  uint
	Content string
}

func Setup(db *gorm.DB) error {
	err := db.AutoMigrate(&User{}, &Friend{}, &Room{}, &RoomParticipant{}, &Message{}, &Session{})

	if err != nil {
		return err
	}

	return nil
}
