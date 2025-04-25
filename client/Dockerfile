FROM node:18-slim AS builder
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000
COPY --from=builder /app ./
CMD ["npm", "start"]
