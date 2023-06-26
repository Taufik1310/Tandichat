package websocket

import (
	"encoding/json"

	"github.com/olahol/melody"
)

func websocketError(message string) []byte {
	payload := Message{
		Type: TYPE_ERROR,
		Data: ErrorData{
			Message: message,
		},
	}

	buff, _ := json.Marshal(payload)

	return buff
}

func getUserId(s *melody.Session) (uint, bool) {
	userID, ok := s.Get("id")

	if !ok {
		buff := websocketError("Client does not have id")
		s.CloseWithMsg(buff)
		return 0, false
	}

	safeID, ok := userID.(uint)

	if !ok {
		buff := websocketError("Id is not Unsigned Int")
		s.CloseWithMsg(buff)
		return 0, false
	}

	return safeID, true
}

func parseTypeMessage(s *melody.Session, payload interface{}) (MessageData, bool) {
	var messageData MessageData
	messageMap, ok := payload.(map[string]interface{})

	if !ok {
		buff := websocketError("Data is not Type MessageData | Data is not a map")
		s.Write(buff)
		return messageData, false
	}

	msg, ok := messageMap["message"]
	if !ok {
		buff := websocketError("Data is not Type MessageData | Message not found")
		s.Write(buff)
		return messageData, false
	}
	messageData.Message, ok = msg.(string)

	if !ok {
		buff := websocketError("Data is not Type MessageData | Message is not a string")
		s.Write(buff)
		return messageData, false
	}

	to, ok := messageMap["to"]

	if !ok {
		buff := websocketError("Data is not Type MessageData | Message destination not found")
		s.Write(buff)
		return messageData, false
	}

	safe_to, ok := to.(float64)
	if !ok {
		buff := websocketError("Data is not Type MessageData | Detination is not uint")
		s.Write(buff)
		return messageData, false
	}
	messageData.To = uint(safe_to)

	return messageData, true
}
