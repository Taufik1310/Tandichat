package database

import (
	"errors"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DatabaseConnection struct {
	Conn *gorm.DB
}

func Connect() (DatabaseConnection, error){
	dsn := "host=localhost user=gorm password=gorm dbname=realtimeApp port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {	
		return DatabaseConnection{}, errors.Join(errors.New("error: Cannot connect to database"), err) 
	}

	return DatabaseConnection{Conn: db}, nil
}

func (db *DatabaseConnection) InsertMessage(from int, to int, msg string){

}

func (db *DatabaseConnection) getAllMessageFromUser(){

}

