FROM node:20.9.0

WORKDIR /usr/app

COPY ./package.json ./
COPY . .

RUN npm install

ENV SERVER_PORT 3000
EXPOSE $SERVER_PORT

CMD ["npm", "run", "start:prod"]