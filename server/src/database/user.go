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

type User struct {
	ID       uint
	Username string
	Email    string
	Avatar   string
	About    string
}

type userid interface {
	uint | string
}

func BlockUser(UserId uint, blockedUserID uint) error {

	var block model.BlockedUser

	block.BlockedUserID = blockedUserID
	block.UserID = UserId

	if err := DB.Create(&block).Error; err != nil {
		return err
	}

	return nil

}

func GetUser[T userid](userId uint, id T) (*User, error) {
	var user *User

	innerQuery := DB.Table("blocked_users").Where("user_id = ?", userId).Select("blocked_user_id")

	if err := DB.Model(&user).Select("id, username, email, avatar, about").Where("id = ? AND id NOT in (?)", id, innerQuery).Scan(&user).Error; err != nil {
		return user, err
	}
	if user.ID == 0 {
		return user, errors.New("error : user not found")
	}
	return user, nil
}

func GetUserByEmail(email string, id uint) (*User, error) {
	var user *User

	innerQuery := DB.Table("blocked_users").Where("user_id = ?", id).Select("blocked_user_id")

	if err := DB.Model(&user).Select("id, username, email, avatar, about").Where("email = ? AND id NOT in (?)", email, innerQuery).Scan(&user).Error; err != nil {
		return user, err
	}
	if user.ID == 0 {
		return user, errors.New("error : user not found")
	}
	return user, nil
}

func InsertUser(user *model.User) error {

	if err := DB.Create(&user).Error; err != nil {
		return err
	}

	return nil
}

func updateUser[T userid](id T, collumn string, value interface{}) error {
	var user model.User

	result := DB.Model(&user).Where("id = ?", id).Update(collumn, value)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("error : userid not found")
	}

	return nil
}

func ChangeUsername[T userid](id T, username string) error {
	if err := updateUser(id, "username", username); err != nil {
		return err
	}

	return nil
}

func ChangeAbout[T userid](id T, about string) error {

	if err := updateUser(id, "about", about); err != nil {
		return err
	}

	return nil
}

func ChangeProfilePicture[T userid](id T, pictureName string) error {
	if err := updateUser(id, "avatar", pictureName); err != nil {
		return err
	}

	return nil
}
