#!/bin/bash


TAG="$1"

if [ "$TAG" == "image" ]; then
  # Build Docker image
  docker build -t realtime-postgres .

  docker container create -p 5432:5432 tandichat

  # Run the container
  docker container start tandichat
fi

if [ "$TAG" == "container" ]; then
  # Run the container
  docker container start tandichat
fi

sleep 3

# Run the Go app
go run src/main.go
