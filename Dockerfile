# etapa de compilación
FROM node:14-alpine

RUN npm install -g http-server
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --unsafe-perm
EXPOSE  8080
CMD ["http-server","dist"]
