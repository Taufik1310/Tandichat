package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
)

type friend struct {
	Id       uint
	Username string
	Email    string
	Avatar   string
	About    string
}

// TODO
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
	result := DB.Where("user_id = ? AND friend_id = ? ", friendid, userid).Delete(&model.Friend{})

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("error : Friend request not found")
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

	if err := DB.Where("id = ?", friendid).First(&model.User{}).Error; err != nil {
		return errors.New("error : User not found")
	}

	if err := DB.Create(&friend).Error; err != nil {
		return err
	}

	return nil
}
