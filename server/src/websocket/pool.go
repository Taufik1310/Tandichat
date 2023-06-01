package websocket

import (
	"errors"

	"github.com/olahol/melody"
)

type Pool struct {
	Pool map[string]*melody.Session
}

func NewPool() Pool {
	return Pool{Pool: map[string]*melody.Session{}}
}

func (p *Pool) GetConnection(id string) (*melody.Session, error) {
	value, ok := p.Pool[id]

	if !ok {
		return nil, errors.New("error: Session not found")
	}

	if value.IsClosed() {
		delete(p.Pool, id)
		return nil, errors.New("error: Connection is already closed")
	}

	return value, nil

}

func (p *Pool) InsertConnection(id string, conn *melody.Session) error {

	p.Pool[id] = conn

	return nil
}
