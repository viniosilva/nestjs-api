FROM node:14.17-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./

FROM builder AS production
RUN npm install --production
COPY dist/ ./dist
CMD [ "npm", "run", "start:prod" ]

FROM builder AS development
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]