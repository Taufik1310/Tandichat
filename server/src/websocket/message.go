package websocket

import (
	"andiputraw/Tandichat/src/database"
	"encoding/json"

	"github.com/olahol/melody"
)

func sendMessage(from uint, message *MessageData, m *melody.Melody) ([]byte, bool) {

	err := database.SendMessage(from, message.To, message.Message)
	if err != nil {
		return websocketError(err.Error()), false
	}

	incomingMessage := Message{
		Type: TYPE_INCOMING_MESSAGE,
		Data: IncomingMessageData{
			From:    from,
			Message: message.Message,
		},
	}

	buff, err := json.Marshal(incomingMessage)

	if err != nil {
		return websocketError(err.Error()), false
	}

	m.BroadcastFilter(buff, func(q *melody.Session) bool {
		id, ok := q.Get("id")
		if ok {
			return id.(uint) == message.To || id.(uint) == from
		}
		return false
	})

	return nil, true
}
