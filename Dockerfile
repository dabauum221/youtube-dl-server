FROM node:8

# Create app directory
WORKDIR /usr/src/app

# production port
ENV PORT=8080

# file system encoding
ENV LC_ALL=en_US.UTF-8

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
