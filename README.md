# FrameLab Academy - Web Platform

**Digital Campus Platform** - Next.js 14 + TailwindCSS + TypeScript

---

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Font:** Inter + Barlow Condensed

---

## 🎨 Design System

Basado en **Metrix Analytics**:

### Colors
- Primary: `#7C3AED` (Violeta)
- Secondary: `#F4A7BB` (Rosa)
- Background: `#050505` (Negro)
- Text: `#FAFAFA` (Blanco)

### Typography
- Headings: Barlow Condensed
- Body: Inter

### Effects
- Glassmorphism
- Gradient backgrounds
- Smooth transitions

---

## 📁 Project Structure

```
framelab-academy-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   ├── lib/
│   └── styles/
│       └── globals.css
├── public/
│   └── images/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## 🛠️ Setup

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
npm run start
```

---

## 🚀 Production Deployment

### Docker Deployment (Recommended)

**1. Clone repository on server:**
```bash
ssh almalinux@54.36.179.126
cd /home/almalinux
git clone https://github.com/maxsarlijagit/framelab-academy-web.git
cd framelab-academy-web
```

**2. Configure environment:**
```bash
cp .env.example .env
nano .env  # Edit with your credentials
```

**3. Deploy:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**4. Verify:**
```bash
docker-compose ps
curl http://localhost:3000
```

### Manual Docker Commands

```bash
# Build
docker-compose build

# Start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Nginx Configuration

The deployment includes nginx as a reverse proxy:
- Port 80 → Frontend (port 3000)
- Port 443 → HTTPS (when SSL is configured)

For SSL setup, use Let's Encrypt:
```bash
docker run --rm -v ./nginx/ssl:/etc/letsencrypt certbot/certbot certonly --webroot
```

---

## 📋 Roadmap

### ✅ Phase 1: Foundation (COMPLETED)
- [x] Next.js 14 setup
- [x] TypeScript configuration
- [x] TailwindCSS with custom theme
- [x] Design tokens
- [x] Basic folder structure
- [x] Landing page (Hero + Features)

### 🟡 Phase 2: Components (IN PROGRESS)
- [ ] Header component
- [ ] Footer component
- [ ] Navigation
- [ ] Button variants
- [ ] Card components
- [ ] Form components

### ⏳ Phase 3: Pages
- [ ] Courses listing
- [ ] Course detail
- [ ] Student dashboard
- [ ] Auth pages (login/register)
- [ ] Profile page

### ⏳ Phase 4: Features
- [ ] Authentication (Clerk/NextAuth)
- [ ] Database integration
- [ ] Payment integration
- [ ] Video player
- [ ] Progress tracking

---

## 🎯 ClickUp Task

**Task:** [1.1 Setup del Proyecto - Next.js + TailwindCSS](https://app.clickup.com/t/86ag9qnc3)

---

**Created:** 2026-03-19  
**Status:** 🟡 In Progress  
**Agent:** OpenClaw Multi-Agent System
