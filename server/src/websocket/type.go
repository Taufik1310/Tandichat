package websocket

import "time"

const TYPE_ERROR = -1
const TYPE_MESSAGE = 0
const TYPE_INCOMING_MESSAGE = 1
const TYPE_NOTIFICATION = 2
const TYPE_FRIEND_REQUEST = 3

type ErrorData struct {
	Message string `json:"message"`
}

type MessageData struct {
	To      uint   `json:"to"`
	Message string `json:"message"`
}

type IncomingMessageData struct {
	From    uint      `json:"from"`
	Date    time.Time `json:"time"`
	Message string    `json:"message"`
}

type Message struct {
	Type int         `json:"type"`
	Data interface{} `json:"data"`
}

type FriendRequest struct {
	From uint `json:"from"`
}
