package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
	"fmt"
)

func GetSession(sessionID uint) (*model.Session, error) {
	var session model.Session

	if err := DB.Model(&session).Where("id = ?", sessionID).First(&session).Error; err != nil {
		return nil, errors.New("error: Session not found")
	}

	DB.Where("id = ?", sessionID).First(&session)

	return &session, nil
}

func GetAllFriends(userID uint) ([]model.User, error) {

	friends := []model.User{}

	DB.Model(&model.Friend{}).Joins("inner join users on users.id = friends.friend_id").Where("user_id = ?", userID).Find(&model.Friend{})

	fmt.Println(friends)
	return nil, nil
}
