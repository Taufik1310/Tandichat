#!/bin/bash

go fmt src/main.go
go fmt src/auth/*.go
go fmt src/config/*.go
go fmt src/database/*.go
go fmt src/model/*.go
go fmt src/routes/*.go
go fmt src/websocket/*.go