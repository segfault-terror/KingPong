FROM node:20.6.1

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN ["npx", "prisma", "generate"]

RUN ["npm", "run", "build"]

CMD ["npm", "run", "start"]

EXPOSE 3030
