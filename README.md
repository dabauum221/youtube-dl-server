# youtube-dl-server

Youtube download server

# How to run

npm install

node server.js

# Docker

docker run -d --name youtube-dl-server -p 8080:8080 --env GOOGLE_API_KEY=? dabauum221/youtube-dl-server:latest

Replace ? with actual google API key for searching

## Compose

version: '3.6'

services:

    youtube-dl-server:
        image: dabauum221/youtube-dl-server:latest
        container_name: youtube-dl-server
        environment:
         - GOOGLE_API_KEY=?
        restart: unless-stopped
