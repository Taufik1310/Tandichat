package database

import "andiputraw/Tandichat/src/model"

func IsUserExist(id string) bool {
	var user model.User

	if err := DB.Where("id = ?", id).First(&user).Error; err != nil {
		return false
	}

	return true
}
