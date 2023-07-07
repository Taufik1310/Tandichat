package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email    string `gorm:"uniqueIndex:idx_email"`
	Username string `gorm:"type:varchar(100);"`
	Password string `gorm:"type:varchar(100);"`
	Avatar   string `gorm:"default:default.png"`
	About    string `gorm:"default:Hello im using tandichat"`
	Verified bool   `gorm:"default:false"`
}

// TODO Use Redis
type VerificationCode struct {
	gorm.Model
	Email string `gorm:"unique"`
	Code  string `gorm:"type:varchar(100);"`
}

// TODO Use Redis
type Session struct {
	gorm.Model
	UserID uint
	User   User
}

type BlockedUser struct {
	gorm.Model
	UserID        uint
	User          User
	BlockedUserID uint
	BlockedUser   User
}

// TODO : Use redis
type WebsocketSessionCache struct {
	gorm.Model
	Uuid string
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
	UserID uint
	User   User
	Room   Room `gorm:"constraint:OnDelete:CASCADE;"`
	RoomID uint
}

type Message struct {
	gorm.Model
	User    User
	UserID  uint
	Room    Room `gorm:"constraint:OnDelete:CASCADE;"`
	RoomID  uint
	Content string
}

func Setup(db *gorm.DB) error {
	err := db.AutoMigrate(&User{}, &Friend{}, &Room{}, &RoomParticipant{}, &Message{}, &Session{}, &WebsocketSessionCache{}, &BlockedUser{}, &VerificationCode{})

	if err != nil {
		return err
	}

	return nil
}
