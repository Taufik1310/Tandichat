package auth

import (
	"errors"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

type websocketAuthStructure struct {
	AuthID string
	//Session ID harusnya dipake buat cek SEKALI LAGI apakah user masih login atau belum
	SessionID string
	jwt.RegisteredClaims
}

func CreateJWT(payload jwt.MapClaims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))
	if err != nil {
		return "", errors.New("error : Failed to create JWT")
	}

	return tokenString, nil
}

// TODO Disini harusnya pake generic, cuman saya tidak tahu cara pakainya
func ParseWebsocketAuthJWT(tokenString string) (*websocketAuthStructure, error) {

	result, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := result.Claims.(*websocketAuthStructure); ok && result.Valid {
		return claims, nil
	} else {
		return nil, errors.New("error : Invalid JWT")
	}
}
