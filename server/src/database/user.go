package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
)

// TODO DELETE THIS
func IsUserExist(id string) bool {
	var user model.User

	if err := DB.First(&user).Error; err != nil {
		return false
	}

	return true
}

type user struct {
	ID       uint
	Username string
	Email    string
	Img      string
	About    string
}

func GetUser(id uint) (*user, error) {
	var user *user

	if err := DB.Model(&user).Select("id, username, email, img, about").Where("id = ?", id).Scan(&user).Error; err != nil {
		return user, err
	}
	return user, nil
}

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
