package auth

import (
	"andiputraw/Tandichat/src/config"
	"andiputraw/Tandichat/src/database"
	"andiputraw/Tandichat/src/model"
	"errors"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type JWTStructure struct {
	SessionID uint   `json:"Sessionid"`
	UserID    uint   `json:"userID"`
	Email     string `json:"email"`
	jwt.RegisteredClaims
}

var (
	errUserNotFound      = errors.New("0 error: User Not Found")
	errPasswordNotMatch  = errors.New("1 error: Password not match")
	errNotVerified       = errors.New("2 error: User is not verified")
	errSessionNotFound   = errors.New("3 error: Session Not Found")
	errAlreadyRegistered = errors.New("4 error: Already Registered ")
	errSignJWTFail       = errors.New("69 error: Sign JWT Fail")
	errFailParseJWT      = errors.New("70 error: Failed To Parse JWT")
)

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

		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return errAlreadyRegistered
		} else {
			return err
		}
	}

	return nil
}

func Login(email string, password string) (string, error) {

	var user model.User
	database.DB.Where(&model.User{Email: email}).First(&user)

	if user.ID == 0 {
		return "", errUserNotFound
	}

	if config.Config.IS_EMAIL_VERIFICATION {
		if !user.Verified {
			return "", errNotVerified
		}
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err != nil {
		return "", errPasswordNotMatch
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
		return "", errSignJWTFail
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
		return errFailParseJWT
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
		return nil, errFailParseJWT
	}

}

func IsConnectedUserIsValid(token string) (*JWTStructure, error) {
	claims, err := ParseJWT(token)

	if err != nil {
		return nil, err
	}

	if !database.IsSessionExist(claims.SessionID) {
		return nil, errSessionNotFound
	}

	return claims, nil
}
