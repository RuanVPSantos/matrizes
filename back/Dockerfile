# Build stage
FROM node:18-slim AS builder

WORKDIR /app

# Install system dependencies for Prisma
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies (including dev dependencies for build)
RUN npm install

# Copy all source files (respecting .dockerignore)
COPY . .

# Create a temporary .env for build if it doesn't exist
RUN if [ ! -f .env ]; then \
  echo "DATABASE_URL=mysql://temp:temp@localhost:3306/temp" > .env && \
  echo "JWT_SECRET=temp-jwt-secret-for-build" >> .env && \
  echo "PORT=3000" >> .env && \
  echo "NODE_ENV=development" >> .env; \
  fi

# Generate Prisma client
RUN npx prisma generate

# Build the application with explicit tsconfig path
RUN npx tsc --project tsconfig.json

# Production stage
FROM node:18-slim AS production

WORKDIR /app

# Install system dependencies for Prisma (runtime)
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy Prisma files
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Create non-root user
RUN useradd --create-home --shell /bin/bash nodejs && \
    chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["npm", "run", "start"]
