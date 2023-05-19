package auth

import (
	"andiputraw/Tandchat/src/database"
	"errors"
	"os"

	"andiputraw/Tandchat/src/model"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Register(username string, email string, password string) error{

	hashedPassword , err := bcrypt.GenerateFromPassword([]byte(password),bcrypt.DefaultCost) 
	
	if err != nil {
		return err
	}

	user := model.User{
		Email:    email,
		Username: username,
		Password: string(hashedPassword),
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return  err
	}

	return nil
}

func Login(email string , password string) (string ,error){

	var user model.User
	database.DB.Where(&model.User{Email: email}).First(&user)

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err != nil {
		return "", errors.New("error: Password does not match")
	}

	session := model.Session{
		UserID: uint(user.ID),
	} 

	result := database.DB.Create(&session)

	if result.Error != nil {
		return "", errors.Join(errors.New("error: Error inserting session to database"), result.Error)
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256,jwt.MapClaims{
		"id" : session.ID,
		"username": user.Username,
		"email": user.Email,
	})

	tokenString , err := token.SignedString([]byte(os.Getenv("SECRET_KEY")));

	if err != nil {
		return "", errors.New("error: Failed to sign JWT")
	}


	return tokenString, nil
}

