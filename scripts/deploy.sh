#!/bin/bash
# Clawport Control Center - Deployment Script
# Usage: ./deploy.sh [production|staging]

set -e

ENV=${1:-production}
echo "🚀 Deploying Clawport Control Center to ${ENV}..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed"
        exit 1
    fi
    
    log_info "✓ Docker: $(docker --version)"
    log_info "✓ Docker Compose: $(docker-compose --version)"
}

# Check environment variables
check_env() {
    log_info "Checking environment configuration..."
    
    if [ ! -f .env ]; then
        log_warn ".env file not found, creating from template..."
        cp .env.example .env
        log_warn "Please edit .env file with your configuration"
        exit 1
    fi
    
    # Check required variables
    required_vars=("JWT_SECRET" "OPENROUTER_API_KEY")
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            log_error "Required environment variable $var is not set"
            exit 1
        fi
    done
    
    log_info "✓ Environment configuration OK"
}

# Build and start services
deploy() {
    log_info "Building Docker images..."
    docker-compose -f docker/docker-compose.yml build --no-cache
    
    log_info "Starting services..."
    docker-compose -f docker/docker-compose.yml up -d
    
    log_info "Waiting for services to be healthy..."
    sleep 10
    
    # Check health
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        log_info "✓ Application is healthy"
    else
        log_error "Application health check failed"
        docker-compose -f docker/docker-compose.yml logs app
        exit 1
    fi
    
    # Check database
    if docker exec clawport-db pg_isready -U clawport > /dev/null 2>&1; then
        log_info "✓ Database is ready"
    else
        log_error "Database health check failed"
        exit 1
    fi
    
    # Check Redis
    if docker exec clawport-redis redis-cli ping > /dev/null 2>&1; then
        log_info "✓ Redis is ready"
    else
        log_error "Redis health check failed"
        exit 1
    fi
}

# Show status
status() {
    log_info "Service Status:"
    docker-compose -f docker/docker-compose.yml ps
    
    log_info "Resource Usage:"
    docker stats --no-stream clawport-app clawport-db clawport-redis
}

# Main
main() {
    echo "======================================"
    echo "  Clawport Control Center Deploy    "
    echo "======================================"
    echo ""
    
    check_prerequisites
    check_env
    deploy
    
    echo ""
    echo "======================================"
    log_info "Deployment completed successfully!"
    echo "======================================"
    echo ""
    log_info "Application: http://localhost:3000"
    log_info "Health Check: http://localhost:3000/health"
    log_info "Metrics: http://localhost:3000/api/metrics"
    echo ""
    log_info "To view logs: docker-compose -f docker/docker-compose.yml logs -f"
    log_info "To stop: docker-compose -f docker/docker-compose.yml down"
}

main
