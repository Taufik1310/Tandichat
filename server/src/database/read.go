package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
)

func GetSession(sessionID uint) (*model.Session, error) {
	var session model.Session

	if err := DB.Model(&session).Where("id = ?", sessionID).First(&session).Error; err != nil {
		return nil, errors.New("error: Session not found")
	}

	DB.Where("id = ?", sessionID).First(&session)

	return &session, nil
}
