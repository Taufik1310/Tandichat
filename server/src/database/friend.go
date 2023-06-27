package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type friend struct {
	Id       uint
	Username string
	Email    string
	Avatar   string
	About    string
}

func GetAllFriends(userid uint) ([]friend, error) {

	friends := []friend{}

	db := DB.Table("friends").Select("users.id, users.email, users.avatar, users.about, users.username").Joins("inner join users on users.id = friends.friend_id").Where("(user_id = ? OR friend_id = ?) AND status = ?", userid, userid, "accepted").Scan(&friends)

	if db.Error != nil {
		return friends, nil
	}

	return friends, nil
}

func GetPendingRequest(userid uint) ([]friend, []friend, error) {
	friends := []friend{}
	recieved := []friend{}

	db := DB.Table("friends").Select("users.id, users.email, users.avatar, users.about, users.username").Joins("inner join users on users.id = friends.friend_id").Where("user_id = ? AND status = ?", userid, "pending").Scan(&friends)

	if db.Error != nil {
		return nil, nil, db.Error
	}

	db = DB.Table("friends").Select("users.id, users.email, users.avatar, users.about, users.username").Joins("inner join users on users.id = friends.user_id").Where("friend_id = ? AND status = ?", userid, "pending").Scan(&recieved)

	if db.Error != nil {
		return nil, nil, db.Error
	}

	return friends, recieved, nil
}

func AcceptFriendRequest(userid uint, friendid uint) error {

	tx := DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	var friend model.Friend

	result := tx.Model(&friend).Where("user_id = ? AND friend_id = ? ", friendid, userid).Update("status", "accepted")

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("error : Friend request not found")
	}

	room := model.Room{}

	if err := tx.Create(&room).Error; err != nil {
		return err
	}

	if err := tx.Create(&model.RoomParticipant{UserID: userid, RoomID: room.ID}).Error; err != nil {
		return err
	}

	if err := tx.Create(&model.RoomParticipant{UserID: friendid, RoomID: room.ID}).Error; err != nil {
		return err
	}

	return tx.Commit().Error
}

func DeclineFriendRequest(userid uint, friendid uint) error {
	if err := deleteFriendRequest(friendid, userid); err != nil {
		return err
	}

	return nil
}

func CancelFriendRequest(userid uint, friendid uint) error {
	if err := deleteFriendRequest(userid, friendid); err != nil {
		return err
	}
	return nil
}

func RequestAddFriend(userid uint, friendid uint) error {

	if userid == friendid {
		return errors.New("error : Cannot add yourself")
	}

	var friend model.Friend
	friend.UserID = userid
	friend.FriendID = friendid
	friend.Status = "pending"

	innerQuery := DB.Table("blocked_users").Where("user_id = ?", userid).Select("blocked_user_id")

	if err := DB.Where("id = ? AND id not in (?)", friendid, innerQuery).First(&model.User{}).Error; err != nil {
		return errors.New("error : User not found")
	}

	if err := DB.Create(&friend).Error; err != nil {
		return err
	}

	return nil
}

func deleteFriendRequest(userid uint, friendid uint) error {
	result := DB.Unscoped().Where("user_id = ? AND friend_id = ? ", userid, friendid).Delete(&model.Friend{})

	query := DB.Explain(DB.ToSQL(func(tx *gorm.DB) *gorm.DB {
		return tx.Unscoped().Where("user_id = ? AND friend_id = ? ", userid, friendid).Delete(&model.Friend{})
	}))

	fmt.Println(query)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("error : Friend request not found")
	}

	return nil
}
