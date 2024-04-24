FROM node:lts-alpine AS runtime
WORKDIR /app

# Install all packages first
COPY src/frontend/package*.json .
RUN npm install

# And then copy the source code
# This way, we can cache the npm install step
COPY src/frontend/ .
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs
