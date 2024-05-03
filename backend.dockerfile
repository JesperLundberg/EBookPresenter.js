FROM node:lts-alpine AS runtime
WORKDIR /app

COPY package*.json .
COPY src/backend/ .

RUN npm i

# EXPOSE 8080

CMD [ "node", "server.js" ]
