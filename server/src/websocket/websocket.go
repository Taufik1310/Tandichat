package websocket

import (
	"andiputraw/Tandichat/src/auth"
	"bytes"
	"encoding/json"

	"github.com/olahol/melody"
)

func HandleConnect(s *melody.Session) {
	query := s.Request.URL.Query()
	jwt := query.Get("auth")
	token, _ := auth.ParseWebsocketAuthJWT(jwt)

	s.Set("id", token.UserID)
}

func HandleMessage(m *melody.Melody) func(s *melody.Session, msg []byte) {

	return func(s *melody.Session, msg []byte) {

		userID, ok := getUserId(s)

		if !ok {
			return
		}

		body := bytes.TrimPrefix(msg, []byte("\xef\xbb\xbf"))

		var message Message

		err := json.Unmarshal(body, &message)

		if err != nil {
			buff := websocketError("Data not recognized | " + err.Error())
			s.Write(buff)
			return
		}

		if message.Type == TYPE_MESSAGE {
			messageData, ok := parseTypeMessage(s, message.Data)

			if !ok {
				return
			}

			error_msg, ok := sendMessage(userID, &messageData, m)

			if !ok {
				s.Write(error_msg)
				return
			}
		}

	}
}
