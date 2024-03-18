FROM node:18.5.0-alpine3.15
WORKDIR /app

# install gcc
RUN apk add --update build-base

# install python3
RUN apk add --update python3

# install redis
RUN apk add --update redis && \
    redis-server &

RUN  apk update \
  && apk upgrade \
  && apk add ca-certificates \
  && update-ca-certificates \
  && apk add --update coreutils && rm -rf /var/cache/apk/*   \ 
  && apk add --update openjdk11 tzdata curl unzip bash \
  && apk add --no-cache nss \
  && rm -rf /var/cache/apk/*

COPY package*.json ./
RUN npm ci 
COPY . .

EXPOSE 5000

CMD ["npx", "nodemon", "index"];
# CMD ["npm", "start"]
