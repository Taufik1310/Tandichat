package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
	"log"

	"gorm.io/gorm"
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

func GetBlockedUser(UserId uint) ([]User, error) {
	var blockedUsers []User

	DB.Table("blocked_users").Joins("inner join users on users.id = blocked_users.blocked_user_id").Select("users.id, users.username, users.email, users.avatar, users.about").Where("user_id = ?", UserId).Scan(&blockedUsers)

	return blockedUsers, nil
}

func UnBlockUser(UserId uint, blockedUserID uint) error {
	result := DB.Unscoped().Where("user_id = ? AND blocked_user_id = ?", UserId, blockedUserID).Delete(&model.BlockedUser{})

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("error : user not found")
	}

	return nil
}

func BlockUser(UserId uint, blockedUserID uint) error {

	var block model.BlockedUser

	block.BlockedUserID = blockedUserID
	block.UserID = UserId

	err := DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&block).Error; err != nil {
			return err
		}

		if err := DeleteFriend(UserId, blockedUserID); err != nil {
			log.Println("INFO: This user ", blockedUserID, " is not friend with", UserId)
		}

		return nil
	})

	return err
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
