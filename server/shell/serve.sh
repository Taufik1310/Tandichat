#!/bin/bash
cd dummy

live-server --port=8080 &
live-server --port=8081 &

cd ..

go run src/main.go 