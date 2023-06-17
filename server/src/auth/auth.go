package auth

import (
	"andiputraw/Tandichat/src/config"
	"andiputraw/Tandichat/src/database"
	"andiputraw/Tandichat/src/model"
	"errors"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type JWTStructure struct {
	SessionID uint   `json:"Sessionid"`
	UserID    uint   `json:"userID"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Profile   string
	About     string
	jwt.RegisteredClaims
}

func Register(username string, email string, password string) error {

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	user := model.User{
		Email:    email,
		Username: username,
		Password: string(hashedPassword),
	}

	if err := database.InsertUser(&user); err != nil {
		return err
	}

	return nil
}

func Login(email string, password string) (string, error) {

	var user model.User
	database.DB.Where(&model.User{Email: email}).First(&user)

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err != nil {
		return "", errors.New("error: Password does not match")
	}

	session := model.Session{
		UserID: user.ID,
	}

	result := database.DB.Create(&session)

	if result.Error != nil {
		return "", errors.Join(errors.New("error: Error inserting session to database"), result.Error)
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"SessionID": session.ID,
		"userID":    user.ID,
		"username":  user.Username,
		"email":     user.Email,
		"profile":   user.Img,
		"about":     user.About,
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))

	if err != nil {
		return "", errors.New("error: Failed to sign JWT")
	}

	return tokenString, nil
}

func Logout(token string) error {

	result, err := jwt.ParseWithClaims(token, &JWTStructure{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(config.Config.SECRET_KEY), nil
	})

	if err != nil {
		return errors.Join(errors.New("error: Failed to decode JWT"), err)
	}

	if claims, ok := result.Claims.(*JWTStructure); ok && result.Valid {

		result := database.DB.Delete(&model.Session{}, claims.SessionID)
		if result.RowsAffected == 0 {
			return errors.New("error: Failed to delete session | Session id not found | Probably already deleted before")
		}

		return nil
	} else {
		return errors.New("error: Failed to parse JWT")
	}

}

func ParseJWT(token string) (*JWTStructure, error) {

	result, err := jwt.ParseWithClaims(token, &JWTStructure{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(config.Config.SECRET_KEY), nil
	})

	if err != nil {
		return nil, errors.Join(errors.New("error: Failed to decode JWT"), err)
	}

	if claims, ok := result.Claims.(*JWTStructure); ok && result.Valid {
		return claims, nil
	} else {
		return nil, errors.New("error: Failed to parse JWT")
	}

}
