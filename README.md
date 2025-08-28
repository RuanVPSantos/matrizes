# 🐳 Matrizes - Docker Setup

Este projeto utiliza Docker para facilitar o desenvolvimento e deployment. A configuração inclui front-end (React + Nginx) e back-end (Node.js + Fastify), conectando-se ao seu banco MySQL externo.

## 📋 Pré-requisitos

- Docker Engine 20.10+
- Docker Compose 2.0+
- **MySQL Database** (já configurado externamente)

## 🚀 Quick Start

### Desenvolvimento

```bash
# Clonar o repositório
git clone <repository-url>
cd matrizes

# Copiar arquivos de ambiente
cp back/.env.example back/.env
cp front/.env.example front/.env

# Editar os arquivos .env com suas configurações específicas
# back/.env: ajustar DATABASE_URL para seu MySQL externo
# front/.env: ajustar VITE_API_URL se necessário

# Construir e iniciar os serviços
docker-compose up --build
```

### Produção

```bash
# Construir e iniciar em modo produção
docker-compose up --build -d
```

## 🔧 Serviços

### Frontend (porta 80)
- **Tecnologia**: React + TypeScript + Vite + Nginx
- **URL**: http://localhost
- **Container**: `matrizes_frontend`

### Backend (porta 3000)
- **Tecnologia**: Node.js + Fastify + TypeScript + Prisma + MySQL
- **URL**: http://localhost:3000
- **Container**: `matrizes_backend`

### Banco de Dados
- **Status**: Configurado externamente (não incluído no Docker)
- **Tecnologia**: MySQL
- **Conexão**: Via DATABASE_URL no back/.env

## 📝 Comandos Úteis

```bash
# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Executar comandos no container
docker-compose exec backend npm run db:migrate
docker-compose exec backend npm run db:seed

# Parar todos os serviços
docker-compose down

# Reconstruir um serviço específico
docker-compose up --build backend
```

## 🔐 Variáveis de Ambiente

### Backend (.env)
```env
DATABASE_URL=mysql://user:password@seu-mysql-server:3306/matrizes
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_USE_MOCK=false
```

## 🏗️ Arquitetura

```
🌐 Cliente ──→ Nginx (porta 80)
                   │
                   ├──→ React App (SPA)
                   └──→ API Proxy ──→ Backend (porta 3000)
                                       │
                                       └──→ MySQL [EXTERNO]
```

## 🔍 Health Checks

Ambos os serviços incluem health checks automáticos:

- **Frontend**: Verifica se o Nginx está respondendo
- **Backend**: Executa health check personalizado

## 🌐 Acesso Externo

- **Frontend**: http://localhost (porta 80)
- **Backend API**: http://localhost:3000
- **Database**: Seu servidor MySQL (porta 3306)

## 🛠️ Desenvolvimento

Para desenvolvimento local com hot reload:

```bash
# Frontend
cd front && npm run dev

# Backend
cd back && npm run dev
```

## 📚 Próximos Passos

1. **Configurar HTTPS** (opcional)
   ```bash
   # Criar certificados SSL
   mkdir -p nginx/ssl
   # Adicionar certificados e configurar nginx.conf
   ```

2. **Configurar CI/CD** (opcional)
   - GitHub Actions
   - Docker Hub
   - Deploy automático

3. **Monitoring** (opcional)
   - Logs centralizados
   - Métricas de performance
   - Alertas

## 🐛 Troubleshooting

### Problemas Comuns

**Frontend não carrega:**
```bash
docker-compose logs frontend
# Verificar se o build foi bem-sucedido
```

**Backend não conecta ao banco:**
```bash
docker-compose logs backend
# Verificar DATABASE_URL no back/.env
# Certificar-se que seu MySQL externo está rodando
```

**Portas ocupadas:**
```bash
# Verificar portas em uso
sudo lsof -i :80
sudo lsof -i :3000
```

## 📞 Suporte

Para problemas ou dúvidas, verifique os logs dos containers:
```bash
docker-compose logs -f
```
