# youtube-dl-server

Youtube download server

# How to run

npm install

node server.js

# Docker

docker build -t youtube-dl-server .

docker run -d --name youtube-dl-server -p 8080:8080 --env GOOGLE_API_KEY=? youtube-dl-server

Replace ? with actual google API key for searching

## Compose

Modify docker-compose.yml to include a valid Google API key

docker-compose up -d
