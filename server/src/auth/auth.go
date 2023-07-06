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
	Email     string `json:"email"`
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

	if config.Config.IS_EMAIL_VERIFICATION {
		if !user.Verified {
			return "", errors.New("error: User is not verified")
		}
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err != nil {
		return "", errors.New("error: Password does not match")
	}

	sessionID, err := database.CreateSession(user.ID)

	if err != nil {
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"SessionID": sessionID,
		"userID":    user.ID,
		"email":     user.Email,
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

		return database.DeleteSession(claims.SessionID)
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

func IsConnectedUserIsValid(token string) (*JWTStructure, error) {
	claims, err := ParseJWT(token)

	if err != nil {
		return nil, err
	}

	if !database.IsSessionExist(claims.SessionID) {
		return nil, errors.New("error: Session not found")
	}

	return claims, nil
}
