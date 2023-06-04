package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
)

//* User

func InsertUser(user *model.User) error {

	if err := DB.Create(&user).Error; err != nil {
		return err
	}

	return nil
}

func ChangeProfilePicture(id string, pictureName string) error {
	var user model.User
	user.Img = pictureName

	if err := DB.Model(&user).Where("id = ?", id).Updates(user).Error; err != nil {
		return errors.New("error: Error at updating profile picture")
	}

	return nil
}

// * Session
