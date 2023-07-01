package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
	"time"

	"gorm.io/gorm/clause"
)

func getRoom(from uint, to uint) (uint, error) {
	var room []model.RoomParticipant

	subQuery := DB.Select("A.room_id").Where("A.user_id <> B.user_id AND a.room_id = b.room_id AND a.user_id = ? AND b.user_id = ?", from, to).Table("room_participants A, room_participants B")
	DB.Select("*").Where("user_id IN ? AND room_id IN (?)", []uint{from, to}, subQuery).Find(&room)

	if len(room) == 0 {
		return 0, errors.New("error : Room not found. maybe you are not friend right now")
	}

	return room[0].RoomID, nil
}

type MessageForUser struct {
	ID        uint
	CreatedAt time.Time
	UserID    uint
	Content   string
}

func GetMessage(from uint, to uint, cursor uint) ([]MessageForUser, uint, error) {

	var messages []MessageForUser
	var next_cursor uint = 0
	room_id, err := getRoom(from, to)
	if err != nil {
		return nil, 0, err
	}

	if cursor == 0 {
		DB.Table("messages").Where("room_id = ?", room_id).Order(clause.OrderByColumn{Column: clause.Column{Name: "id"}, Desc: true}).Limit(100).Scan(&messages)

	} else {
		DB.Table("messages").Where("room_id = ? AND id <= ?", room_id, cursor).Order(clause.OrderByColumn{Column: clause.Column{Name: "id"}, Desc: true}).Limit(100).Scan(&messages)
	}

	if len(messages) > 1 {
		last_message := messages[0]
		next_cursor = last_message.ID
		messages = messages[1:]
	} else if len(messages) == 1 {
		last_message := messages[0]
		next_cursor = last_message.ID
	}

	return messages, next_cursor, nil

}

func SendMessage(from uint, to uint, message string) error {
	var messageData model.Message

	room_id, err := getRoom(from, to)
	if err != nil {
		return err
	}

	messageData.UserID = from
	messageData.RoomID = room_id
	messageData.Content = message

	if err := DB.Create(&messageData).Error; err != nil {
		return err
	}

	return nil
}
