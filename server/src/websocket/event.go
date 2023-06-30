package websocket

import (
	"log"

	"github.com/olahol/melody"
	"gopkg.in/square/go-jose.v2/json"
)

func NewFriendRequest(from uint, to uint, m *melody.Melody) {

	buff := Message{
		Type: TYPE_FRIEND_REQUEST,
		Data: FriendRequest{
			From: from,
		},
	}

	message, err := json.Marshal(buff)

	if err != nil {
		log.Println(err)
		return
	}

	m.BroadcastFilter([]byte(message), func(s *melody.Session) bool {
		id, ok := s.Get("id")

		if ok {
			return id.(uint) == to
		}

		return false

	})
}
