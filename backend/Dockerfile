FROM node:18-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install
RUN npm install prisma @prisma/client

COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 8080

CMD ["npm", "start"]
