FROM node:18.5.0-alpine3.15
WORKDIR /app

# install gcc
RUN apk add --update build-base

# install python3
RUN apk add --update python3

# install redis
RUN apk add --update redis && \
    redis-server &

COPY package*.json ./
RUN npm install 
COPY . .

EXPOSE 5000

CMD ["npx", "nodemon", "index"];
# CMD ["npm", "start"]