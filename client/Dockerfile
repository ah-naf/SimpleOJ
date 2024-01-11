FROM node:18.5.0-alpine3.15

WORKDIR /app
COPY package*.json ./
RUN npm i 
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . .

EXPOSE 3000
CMD ["npm", "start"];
