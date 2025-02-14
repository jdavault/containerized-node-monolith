FROM node:alpine

WORKDIR /srv

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]