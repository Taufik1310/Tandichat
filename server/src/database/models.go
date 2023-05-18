package database

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email    string `gorm:"unique"`
	Username string
	Password string
	Img      string `gorm:"default:"default.png""`
	About    string `gorm:"default:"Hello im using Tandichat"`
}

type Room struct {
	gorm.Model
	User1   User
	User1Id int
	User2   User
	User2Id int
}

type Message struct {
	gorm.Model
	From   User `gorm:"foreignKey:FromID"`
	To     User `gorm:"foreignKey:ToID"`
	FromId int
	ToID   int
	Room   Room
	RoomId int
}

type Session struct {
	gorm.Model
	UserId int
	User   User `gorm:"embedded"`
}
