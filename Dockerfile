#Stage 1
FROM node:17-alpine as builder
RUN apk update && \
    apk add --no-cache curl
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]