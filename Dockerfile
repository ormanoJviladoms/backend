# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY api/package*.json ./
RUN npm ci --only=production
COPY api/ ./

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD ["node", "src/index.js"]
