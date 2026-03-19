# FrameLab Academy - Production Docker Deployment

## 📦 Docker Configuration

### Dockerfile
```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  framelab-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: framelab-academy-web
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    volumes:
      - ./logs:/app/logs
    networks:
      - framelab-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    container_name: framelab-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - framelab-web
    networks:
      - framelab-network

networks:
  framelab-network:
    driver: bridge
```

### nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    upstream framelab {
        server framelab-web:3000;
        keepalive 64;
    }

    server {
        listen 80;
        server_name academy.framelab.com;

        location / {
            proxy_pass http://framelab;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        location /health {
            proxy_pass http://framelab;
            access_log off;
        }
    }
}
```

## 🚀 Deployment Commands

### Build and Run
```bash
# Build image
docker-compose build

# Start containers
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f framelab-web
```

### Update Deployment
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

### Stop
```bash
docker-compose down
```

## 📝 Environment Variables

Create `.env` file:
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/framelab"

# Auth
NEXTAUTH_URL="https://academy.framelab.com"
NEXTAUTH_SECRET="your-secret-key-here"

# Meta API (if needed)
META_ACCESS_TOKEN="your-token"
META_AD_ACCOUNT_ID="your-account-id"
```

## 🔒 SSL Setup (Optional)

For production SSL, use Let's Encrypt:
```bash
# Install certbot
docker run --rm -v ./nginx/ssl:/etc/letsencrypt certbot/certbot certonly --webroot

# Update nginx.conf for HTTPS
```

## 📊 Monitoring

```bash
# Container stats
docker stats framelab-academy-web

# Logs
docker logs framelab-academy-web

# Restart container
docker restart framelab-academy-web
```

---

**Created:** 2026-03-19  
**Version:** 1.0.0  
**Framework:** Next.js 14 + Docker
