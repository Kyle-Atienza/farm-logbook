# 1. Use official Node base image
FROM node:20-alpine

# 2. Set working directory inside container
WORKDIR /app

RUN apk add --no-cache openssl

# 3. Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --production

# 4. Copy rest of application code
COPY . .

# 5. Build TypeScript
RUN npm run build

# 6. Expose port (same as server listen)
EXPOSE 4000

# 7. Command to run service
CMD ["node", "dist/index.js"]