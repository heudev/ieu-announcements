FROM node:18-alpine

WORKDIR /opt/node-server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "src/app.js"]