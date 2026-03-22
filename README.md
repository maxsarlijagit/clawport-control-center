# 🚀 Clawport Control Center v2.0

**Project Management Platform with AI Agent Integration**

---

## 📋 Overview

Clawport Control Center is a modern project management platform that integrates AI agents for task automation and intelligent assistance.

### Features

- ✅ Project & Task Management
- ✅ AI Agent Integration (OpenRouter/Gensee)
- ✅ Real-time Updates (WebSocket)
- ✅ PostgreSQL Database
- ✅ Redis Caching
- ✅ Docker Deployment
- ✅ Nginx Reverse Proxy
- ✅ SSL/TLS Support
- ✅ Monitoring & Metrics

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | Node.js + Express |
| Database | PostgreSQL 15 |
| Cache | Redis 7 |
| Proxy | Nginx |
| Container | Docker + Compose |
| AI | OpenRouter (Gensee) |

---

## 🚀 Quick Start

### Prerequisites

- Docker 20+
- Docker Compose 2+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/maxsarlijagit/clawport-control-center.git
cd clawport-control-center

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Deploy
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### Access

| Service | URL |
|---------|-----|
| Application | http://localhost:3000 |
| Health Check | http://localhost:3000/health |
| Metrics API | http://localhost:3000/api/metrics |
| Grafana (monitoring) | http://localhost:3001 |

---

## 📦 Docker Services

| Service | Container | Port | Description |
|---------|-----------|------|-------------|
| app | clawport-app | 3000 | Main application |
| db | clawport-db | 5432 | PostgreSQL database |
| redis | clawport-redis | 6379 | Redis cache |
| nginx | clawport-nginx | 80/443 | Reverse proxy |
| watchtower | clawport-watchtower | - | Auto updates |
| prometheus | clawport-prometheus | - | Metrics collection |
| grafana | clawport-grafana | 3001 | Dashboards |

---

## 📡 API Endpoints

### Projects

```bash
# List all projects
GET /api/projects

# Create project
POST /api/projects
{
  "name": "My Project",
  "description": "Project description",
  "ownerId": "uuid"
}
```

### Tasks

```bash
# List tasks
GET /api/tasks?projectId=xxx&status=todo

# Create task
POST /api/tasks
{
  "projectId": "uuid",
  "title": "Task title",
  "description": "Task description",
  "priority": "high",
  "assigneeId": "uuid",
  "dueDate": "2026-04-01"
}

# Update task status
PATCH /api/tasks/:id/status
{
  "status": "done"
}
```

### Agents

```bash
# List agents
GET /api/agents

# Execute agent
POST /api/agents/:id/execute
{
  "task": "Analyze project data",
  "context": {}
}
```

### Metrics

```bash
# Get system metrics
GET /api/metrics
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| NODE_ENV | No | production | Environment |
| PORT | No | 3000 | Application port |
| DATABASE_URL | Yes | - | PostgreSQL connection |
| REDIS_URL | Yes | - | Redis connection |
| JWT_SECRET | Yes | - | JWT signing key |
| OPENROUTER_API_KEY | No | - | AI API key |

---

## 📊 Monitoring

### Prometheus Metrics

- Request rate
- Response times
- Database connections
- Redis operations
- Agent executions

### Grafana Dashboards

Access Grafana at http://localhost:3001

Default credentials:
- Username: admin
- Password: admin123 (change in production!)

---

## 🔒 Security

### Implemented

- ✅ JWT Authentication
- ✅ Rate Limiting
- ✅ SQL Injection Protection
- ✅ XSS Prevention
- ✅ HTTPS Support
- ✅ Non-root Docker user
- ✅ Security Headers

### Recommendations

1. Change all default passwords
2. Use strong JWT_SECRET (32+ chars)
3. Enable SSL/TLS in production
4. Regular security updates
5. Backup database regularly

---

## 📝 Development

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

---

## 🔄 Deployment

### Production Deploy

```bash
# Full deployment
./scripts/deploy.sh production

# View logs
docker-compose -f docker/docker-compose.yml logs -f

# Restart services
docker-compose -f docker/docker-compose.yml restart

# Stop all services
docker-compose -f docker/docker-compose.yml down
```

### Backup Database

```bash
docker exec clawport-db pg_dump -U clawport clawport > backup.sql
```

### Restore Database

```bash
docker exec -i clawport-db psql -U clawport clawport < backup.sql
```

---

## 🐛 Troubleshooting

### App won't start

```bash
# Check logs
docker-compose -f docker/docker-compose.yml logs app

# Restart
docker-compose -f docker/docker-compose.yml restart app
```

### Database connection failed

```bash
# Check if DB is running
docker exec clawport-db pg_isready -U clawport

# Check logs
docker-compose -f docker/docker-compose.yml logs db
```

### Redis connection failed

```bash
# Ping Redis
docker exec clawport-redis redis-cli ping

# Restart Redis
docker-compose -f docker/docker-compose.yml restart redis
```

---

## 📄 License

MIT License - See LICENSE file for details.

---

## 👥 Author

Clawport Team

**Version:** 2.0.0  
**Last Updated:** 2026-03-21
