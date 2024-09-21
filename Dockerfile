FROM node:22-alpine
WORKDIR /opt/node-server
COPY . .
RUN npm install
CMD ["node", "v6/src/app.js"]