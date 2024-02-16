FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's code
COPY . .

EXPOSE 3333

CMD ["node", "server.js"]
