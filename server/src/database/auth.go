package database

import (
	"andiputraw/Tandichat/src/model"
	"encoding/base64"
	"errors"

	"github.com/thanhpk/randstr"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func Encode(s string) string {
	data := base64.StdEncoding.EncodeToString([]byte(s))
	return string(data)
}

func Decode(s string) (string, error) {
	data, err := base64.StdEncoding.DecodeString(s)
	if err != nil {
		return "", err
	}

	return string(data), nil
}

func CreateVerifyAuthCode(Email string) (string, error) {
	code := randstr.String(20)

	var verificationCode model.VerificationCode
	verificationCode.Code = Encode(code)
	verificationCode.Email = Email

	DB.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "email"}},
		DoUpdates: clause.Assignments(map[string]interface{}{"code": verificationCode.Code}),
	}).Create(&verificationCode)

	return code, nil
}

func VerifyAuthCode(code string) error {
	verifyCode := Encode(code)

	err := DB.Transaction(func(tx *gorm.DB) error {
		var verificationCode model.VerificationCode

		if err := tx.First(&verificationCode).Where("code = ?", verifyCode).Error; err != nil {
			return err
		}

		if verificationCode.ID == 0 {
			return errors.New("error: Verification code not found")
		}

		result := tx.Model(model.User{}).Where("email = ?", verificationCode.Email).Update("verified", true)

		if result.Error != nil {
			return result.Error
		}

		if result.RowsAffected == 0 {
			return errors.New("error: Failed to update user into verified")
		}
		return nil
	})

	return err
}
