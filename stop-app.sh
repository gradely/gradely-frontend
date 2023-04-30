#!/bin/bash
APP=$1

# Check if app is not provided then close all apps
if [ -z "$1" ]; then
    docker-compose down -v

# Else close the specific app
else
    docker-compose -f ./gradely-$APP/docker-compose.yml down -v
fi
