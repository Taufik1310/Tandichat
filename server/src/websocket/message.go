package websocket

import (
	"andiputraw/Tandichat/src/config"
	"andiputraw/Tandichat/src/database"
	"encoding/json"
	"strconv"
	"time"

	"github.com/olahol/melody"
)

func sendMessage(from uint, message *MessageData, m *melody.Melody) ([]byte, bool) {

	messageLength := len(message.Message)
	if messageLength > config.Config.MESSAGE_LIMIT {
		return websocketError("Message limit reached. Get :", strconv.Itoa(messageLength), "limit is", strconv.Itoa(config.Config.MESSAGE_LIMIT)), false
	}

	err := database.SendMessage(from, message.To, message.Message)
	if err != nil {
		return websocketError(err.Error()), false
	}

	incomingMessage := Message{
		Type: TYPE_INCOMING_MESSAGE,
		Data: IncomingMessageData{
			From:    from,
			Date:    time.Now(),
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
			return id.(uint) == message.To
		}
		return false
	})

	return nil, true
}
