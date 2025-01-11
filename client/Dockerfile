FROM node:20-alpine

WORKDIR /src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3006

CMD ["npm", "run", "start"]