# 🚀 DEPLOY FRAMELAB ACADEMY - GUÍA COMPLETA

## 📋 INFORMACIÓN DEL SERVIDOR

| Parámetro | Valor |
|-----------|-------|
| **IP** | 54.36.179.126 |
| **Puerto SSH** | 22 |
| **Usuario** | almalinux |
| **Password** | DFsNEICMPdOXxYbJ |
| **Puerto Público** | 3000 (Next.js) |

---

## ⚠️ IMPORTANTE - SSH KEY REQUERIDA

El servidor **NO acepta password por SSH**. Necesitás configurar una SSH key.

### Opción A: Usar SSH Key (Recomendado)

```bash
# 1. Generar key (si no tenés)
ssh-keygen -t ed25519 -f ~/.ssh/framelab-vps

# 2. Copiar key al servidor
ssh-copy-id -i ~/.ssh/framelab-vps.pub almalinux@54.36.179.126
# (te va a pedir el password una vez: DFsNEICMPdOXxYbJ)

# 3. Conectarse
ssh -i ~/.ssh/framelab-vps almalinux@54.36.179.126
```

### Opción B: Usar password temporalmente

```bash
# Instalar sshpass (si no tenés)
# Ubuntu/Debian:
sudo apt-get install sshpass

# macOS:
brew install sshpass

# Conectarse con password
sshpass -p 'DFsNEICMPdOXxYbJ' ssh -o StrictHostKeyChecking=no almalinux@54.36.179.126
```

---

## 🐳 DEPLOY PASO A PASO

### 1. Conectarse al servidor

```bash
ssh almalinux@54.36.179.126
```

### 2. Verificar Docker

```bash
docker --version
docker-compose --version
```

Si no están instalados:

```bash
# Instalar Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker almalinux
exit  # Reconectar para aplicar cambios
```

### 3. Clonar repositorio

```bash
cd ~
git clone https://github.com/maxsarlijagit/framelab-academy-web.git
cd framelab-academy-web
```

### 4. Configurar variables de entorno

```bash
cp .env.example .env
nano .env
```

**Variables requeridas (.env):**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/framelab"

# NextAuth
NEXTAUTH_SECRET="tu-secreto-generado"
NEXTAUTH_URL="http://54.36.179.126:3000"

# ClickUp (opcional)
CLICKUP_API_KEY="pk_..."

# GitHub (opcional)
GITHUB_TOKEN="ghp_..."
```

Generar NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 5. Ejecutar deployment

```bash
# Dar permisos al script
chmod +x deploy.sh

# Ejecutar
./deploy.sh
```

O manualmente:

```bash
# Build
docker-compose build

# Start
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### 6. Verificar deployment

```bash
# Ver contenedores corriendo
docker-compose ps

# Testear locally
curl http://localhost:3000

# Testear desde fuera (en tu navegador)
# http://54.36.179.126:3000
```

---

## 🔓 FIREWALL / PUERTOS

Si no podés acceder desde fuera, abrir puerto 3000:

```bash
# AlmaLinux/RHEL (firewalld)
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload

# O con iptables
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
```

---

## 📊 COMANDOS ÚTILES

```bash
# Ver logs
docker-compose logs -f

# Ver logs de un servicio
docker-compose logs web
docker-compose logs nginx

# Reiniciar
docker-compose restart

# Detener
docker-compose down

# Ver estado
docker-compose ps

# Acceder al contenedor
docker-compose exec web bash
```

---

## 🌐 ACCESO PÚBLICO

Una vez desplegado:

| Servicio | URL |
|----------|-----|
| **Next.js** | http://54.36.179.126:3000 |
| **Nginx** | http://54.36.179.126:80 |

### Configurar Dominio (Opcional)

1. Apuntar DNS `academy.framelab.com` → `54.36.179.126`
2. Actualizar `.env`: `NEXTAUTH_URL="https://academy.framelab.com"`
3. Re-deploy: `docker-compose up -d --build`

### SSL/HTTPS (Opcional)

```bash
# Instalar Certbot
sudo dnf install certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d academy.framelab.com
```

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot find module"

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Error: "Port already in use"

```bash
# Ver qué usa el puerto
sudo netstat -tulpn | grep 3000

# Matar proceso o cambiar puerto en docker-compose.yml
```

### Error: "Permission denied"

```bash
# Agregar usuario al grupo docker
sudo usermod -aG docker almalinux
exit  # Reconectar
```

---

## 📞 SOPORTE

Si algo falla:

1. Ver logs: `docker-compose logs -f`
2. Ver estado: `docker-compose ps`
3. Verificar .env: `cat .env`

---

**Última actualización:** 2026-03-19 13:45 UTC  
**Versión:** 1.0  
**Repo:** https://github.com/maxsarlijagit/framelab-academy-web
