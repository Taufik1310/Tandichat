package database

import (
	"andiputraw/Tandichat/src/model"
	"errors"
	"time"
)

func InsertWebsocketCache(value string) error {
	var session model.WebsocketSessionCache
	session.Uuid = value

	if err := DB.Create(&session).Error; err != nil {
		return errors.New("error insert cache")
	}

	return nil
}

func GetWebsocketCache(authID string) (time.Time, error) {
	var session model.WebsocketSessionCache

	if err := DB.Model(&session).Select("*").Where("uuid = ?", authID).First(&session).Error; err != nil {
		return session.CreatedAt, errors.New("error get cache")
	}

	if session.ID == 0 {
		return session.CreatedAt, errors.New("error cache not found")
	}

	if err := DB.Where("uuid = ? ", authID).Delete(&session).Error; err != nil {
		return session.CreatedAt, errors.New("error delete cache")
	}

	return session.CreatedAt, nil
}
