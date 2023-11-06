FROM node:18

# Create app directory
WORKDIR /src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

# Bundle app source
COPY . .
# copying everything?!

RUN npm install

EXPOSE 8080

VOLUME [ "/src/app/node_modules" ]

CMD [ "npm", "run", "start" ]