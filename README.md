# 🐾 Clawport Control Center

**AI Operations Control Center** - Dashboard visual para operaciones de IA

---

## 🚀 Características

- 📊 **Metrix Analytics** - Reportes de campañas Meta Ads
- ✅ **ClickUp Monitor** - 71 tareas monitoreadas en tiempo real
- 💚 **System Health** - Estado de servicios y contenedores
- 🔐 **Auth** - Login con roles (Admin)

---

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 14 + TypeScript + TailwindCSS
- **Auth:** NextAuth.js
- **Charts:** Recharts
- **Deploy:** Docker + VPS (puerto 3100)

---

## 🏃 Quick Start

```bash
# Install
npm install

# Dev
npm run dev

# Build
npm run build

# Start
npm start
```

---

## 🐳 Docker Deploy

```bash
# Build
docker-compose build

# Start
docker-compose up -d

# Logs
docker-compose logs -f
```

---

## 🔐 Credenciales

| Usuario | Password |
|---------|----------|
| admin | admin123 |

---

## 📁 Estructura

```
src/
├── app/
│   ├── dashboard/    # Dashboard principal
│   ├── metrix/       # Metrix Analytics
│   ├── clickup/      # ClickUp Monitor
│   ├── meta/         # Meta Ads
│   ├── health/       # System Health
│   ├── login/        # Login page
│   └── api/          # API routes
├── components/       # React components
├── lib/             # Utilities & auth
└── types/           # TypeScript types
```

---

## 🌐 URLs

- **Local:** http://localhost:3100
- **VPS:** http://54.36.179.126:3100

---

*Clawport Control Center - Operaciones AI en un solo lugar*
