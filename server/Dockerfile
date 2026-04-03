# -------- BUILD STAGE --------
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build


# -------- RUNTIME STAGE --------
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
RUN npm ci --production

# Copy Prisma schema (needed for generate)
COPY prisma ./prisma/

# 🔑 Generate Prisma client in runtime
RUN npx prisma generate

# Copy built app
COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/index.js"]