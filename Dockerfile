FROM node:20.11.0 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.11.0

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm install --only=production

COPY wait-for-db.sh ./
RUN chmod +x wait-for-db.sh

EXPOSE 3001

CMD ["node", "./dist/src/main.js", "./wait-for-db.sh"] 