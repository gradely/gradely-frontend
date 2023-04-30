#!/bin/bash
# Define a variable with a default value of false
BUILD=false
APP=$2

# Check if an argument was provided
if [ $# -gt 0 ]; then
  # Update the variable if the argument is "build"
  if [ "$1" = "build" ]; then
    BUILD=true
  fi
fi

# Execute other commands based on the value of the variable
if [ "$BUILD" = true ]; then
  docker build -f Dockerfile.base -t gradely-wrapper .

  # Check if second argument is not provided then run build on all apps
  if [ -z "$2" ]; then
    docker-compose up --build

  # Else run build on the specific app
  else
    docker-compose -f ./gradely-$APP/docker-compose.yml up --build
  fi

else
  if [ -z "$2" ]; then
    docker-compose up

  # Else run build on the specific app
  else
    docker-compose -f ./gradely-$APP/docker-compose.yml up
  fi
fi