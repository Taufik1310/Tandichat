package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
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

	/* SELECT user.id user.email user.avatar FROM user
	WHERE user.id IN (SELECT friend_id FROM friends WHERE user_id = 1)
	OR user.id IN (SELECT user_id FROM friends WHERE friend_id = 1)
	*/

	sub_query_1 := DB.Table("friends").Select("friend_id").Where("user_id = ? AND status = ?", userid, "accepted")
	sub_query_2 := DB.Table("friends").Select("user_id").Where("friend_id = ? AND status = ?", userid, "accepted")

	db := DB.Table("users").Select("users.id, users.email, users.avatar, users.about, users.username").Where("users.id IN (?) OR users.id IN (?) ", sub_query_1, sub_query_2).Scan(&friends)

	if db.Error != nil {
		return friends, nil
	}

	return friends, nil
}

func GetPendingRequest(userid uint) ([]friend, []friend, error) {
	friends := []friend{}
	received := []friend{}

	db := DB.Table("friends").Select("users.id, users.email, users.avatar, users.about, users.username").Joins("inner join users on users.id = friends.friend_id").Where("user_id = ? AND status = ?", userid, "pending").Scan(&friends)

	if db.Error != nil {
		return nil, nil, db.Error
	}

	db = DB.Table("friends").Select("users.id, users.email, users.avatar, users.about, users.username").Joins("inner join users on users.id = friends.user_id").Where("friend_id = ? AND status = ?", userid, "pending").Scan(&received)

	if db.Error != nil {
		return nil, nil, db.Error
	}

	return friends, received, nil
}

func AcceptFriendRequest(userid uint, friendid uint) error {

	err := DB.Transaction(func(tx *gorm.DB) error {

		var friend model.Friend

		result := tx.Model(&friend).Where("user_id = ? AND friend_id = ? AND status = ? ", friendid, userid, "pending").Update("status", "accepted")

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

		return nil

	})

	if err != nil {
		return err
	}

	return nil
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

func DeleteFriend(userid uint, friendid uint) error {

	err := DB.Transaction(func(tx *gorm.DB) error {
		result := tx.Unscoped().Where("(user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)", userid, friendid, friendid, userid).Delete(&model.Friend{})

		if result.Error != nil {
			return result.Error
		}

		var room_participants []model.RoomParticipant

		if result.RowsAffected == 0 {
			return errors.New("error : Friend request not found")
		}

		subQuery := DB.Select("A.room_id").Where("A.user_id <> B.user_id AND a.room_id = b.room_id AND a.user_id = ? AND b.user_id = ?", userid, friendid).Table("room_participants A, room_participants B")

		result = tx.Unscoped().Clauses(clause.Returning{}).Where("user_id IN ? AND room_id IN (?)", []uint{userid, friendid}, subQuery).Delete(&room_participants)

		if result.Error != nil {
			return result.Error
		}

		if result.RowsAffected == 0 {
			return errors.New("error : Room participant not found")
		}

		room_id := uint(0)

		if len(room_participants) > 0 {
			room_id = room_participants[0].RoomID
		}

		result = tx.Unscoped().Where("room_id = ?", room_id).Delete(&model.Message{})

		if result.Error != nil {
			return result.Error
		}

		result = tx.Unscoped().Where("id = ?", room_id).Delete(&model.Room{})

		if result.Error != nil {
			return result.Error
		}

		if result.RowsAffected == 0 {
			return errors.New("error : Failed to delete room")
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil

}
func deleteFriendRequest(userid uint, friendid uint) error {

	result := DB.Unscoped().Where("user_id = ? AND friend_id = ? ", userid, friendid).Delete(&model.Friend{})

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("error : Friend request not found")
	}

	return nil
}
