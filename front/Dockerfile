# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create a temporary .env for build if it doesn't exist
RUN echo "VITE_API_URL=http://localhost:3000" > .env || true
RUN echo "VITE_USE_MOCK=false" >> .env || true
RUN echo "VITE_APP_TITLE=Matrizes" >> .env || true
RUN echo "VITE_APP_VERSION=1.0.0" >> .env || true

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
