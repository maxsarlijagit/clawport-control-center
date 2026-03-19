#!/bin/bash
# FrameLab Academy - One-Click Deploy Script
# Server: 54.36.179.126 (AlmaLinux)

set -e

echo "========================================"
echo "🚀 FRAMELAB ACADEMY - DEPLOYMENT"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check Docker
echo "1️⃣  Checking Docker..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker not found. Installing...${NC}"
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo -e "${YELLOW}⚠️  Please logout and login again for Docker group to apply${NC}"
    exit 1
fi
docker --version
echo -e "${GREEN}✅ Docker found${NC}"
echo ""

# Check docker-compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ docker-compose not found${NC}"
    exit 1
fi
docker-compose --version
echo ""

# Check .env
if [ ! -f .env ]; then
    echo "2️⃣  Creating .env from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env with your credentials:${NC}"
    echo "   nano .env"
    echo ""
    echo "   Required variables:"
    echo "   - DATABASE_URL"
    echo "   - NEXTAUTH_SECRET"
    echo "   - NEXTAUTH_URL"
    echo ""
    exit 1
fi
echo -e "${GREEN}✅ .env found${NC}"
echo ""

# Build
echo "3️⃣  Building Docker image..."
docker-compose build
echo -e "${GREEN}✅ Build complete${NC}"
echo ""

# Stop existing
echo "4️⃣  Stopping existing containers..."
docker-compose down || true
echo -e "${GREEN}✅ Stopped${NC}"
echo ""

# Start
echo "5️⃣  Starting containers..."
docker-compose up -d
echo -e "${GREEN}✅ Containers started${NC}"
echo ""

# Status
echo "6️⃣  Container status:"
docker-compose ps
echo ""

# Logs
echo "7️⃣  Recent logs:"
docker-compose logs --tail=20 web
echo ""

# Firewall
echo "8️⃣  Checking firewall..."
if command -v firewall-cmd &> /dev/null; then
    if ! sudo firewall-cmd --list-ports | grep -q 3000; then
        echo "   Opening port 3000..."
        sudo firewall-cmd --permanent --add-port=3000/tcp
        sudo firewall-cmd --reload
        echo -e "${GREEN}✅ Port 3000 opened${NC}"
    else
        echo -e "${GREEN}✅ Port 3000 already open${NC}"
    fi
fi
echo ""

# Summary
echo "========================================"
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo "========================================"
echo ""
echo "📊 Access points:"
echo "   - Local: http://localhost:3000"
echo "   - Public: http://$(curl -s ifconfig.me):3000"
echo "   - Nginx: http://$(curl -s ifconfig.me)"
echo ""
echo "🔧 Useful commands:"
echo "   - Logs: docker-compose logs -f"
echo "   - Status: docker-compose ps"
echo "   - Restart: docker-compose restart"
echo "   - Stop: docker-compose down"
echo ""
echo "📝 Next steps:"
echo "   1. Test: http://$(curl -s ifconfig.me):3000"
echo "   2. Configure domain (optional)"
echo "   3. Setup SSL (optional)"
echo ""
