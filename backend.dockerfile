FROM node:21-alpine3.18
WORKDIR /app

COPY package*.json .
COPY src/backend/ .

RUN npm i

# EXPOSE 8080

CMD [ "node", "server.js" ]
