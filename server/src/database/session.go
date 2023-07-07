package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
)

func CreateSession(userID uint) (uint, error) {
	session := model.Session{
		UserID: userID,
	}

	if err := DB.Create(session).Error; err != nil {
		return 0, err
	}

	return session.ID, nil
}

func DeleteSession(sessionID uint) error {
	result := DB.Where("id = ?", sessionID).Delete(&model.Session{})

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("error: Failed to delete session | Session id not found | Probably already deleted before")

	}

	return nil
}

func GetSession(sessionID uint) (*model.Session, error) {
	var session model.Session

	if err := DB.Model(&session).Where("id = ?", sessionID).First(&session).Error; err != nil {
		return nil, errors.New("error: Session not found")
	}

	DB.Where("id = ?", sessionID).First(&session)

	return &session, nil
}

func IsSessionExist(id uint) bool {
	var session model.Session

	if err := DB.Where("id = ?", id).First(&session).Error; err != nil {
		return false
	}

	return true

}
