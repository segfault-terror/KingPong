FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN ["npx", "prisma", "generate"]

CMD ["npm", "run", "start:dev"]

EXPOSE 3000
