#!/bin/bash


TAG="$1"

if [ "$TAG" == "--docker-build" ]; then
  # Build Docker image
  docker build -t realtime-postgres .

  docker container create -p 5432:5432 

  # Run the container
  docker container start -p 5432:5432 realtime-postgres
fi

if [ "$TAG" == "--docker-run" ]; then
  # Run the container
  docker container start  -p 5432:5432 realtime-postgres
fi

sleep 3

# Run the Go app
go run src/main.go
