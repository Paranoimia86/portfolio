# E-shop

Fullstack e-commerce aplikácia postavená na React (frontend) + Node.js/Express (backend) + PostgreSQL, spustiteľná cez Docker Compose.

## Štruktúra projektu

```
.
├── client/                 # Frontend aplikácia (React + Vite)
├── server/                 # Backend aplikácia (Node.js/Express)
├── docker-compose.yml      # Docker Compose konfigurácia
└── README.md
```

## Požiadavky

- Docker Desktop alebo Docker Engine + Docker Compose

## Rýchly štart

### 1. Nastavenie environment premenných

```bash
cp server/.env.example server/.env
```

Uprav hodnoty v `server/.env` podľa potreby (najmä `JWT_ACCESS_TOKEN` a `JWT_REFRESH_TOKEN` - vygeneruj vlastné náhodné reťazce).

### 2. Spustenie

```bash
docker-compose up -d
```

### 3. Prístup k aplikácii

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **PostgreSQL**: localhost:5432

## Databáza

Databáza sa automaticky inicializuje zo súboru `server/database/init.sql` pri prvom spustení.

## Užitočné príkazy

```bash
docker-compose up -d --build   # build a spustenie
docker-compose down            # zastavenie
docker-compose down -v         # zastavenie + zmazanie dát
docker-compose logs -f backend # logy backendu
```

## Vývoj bez Dockeru (voliteľné)

```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm run dev
```

## Technológie

- **Frontend**: React, Vite
- **Backend**: Node.js, Express, JWT autentifikácia
- **Databáza**: PostgreSQL
- **Orchestration**: Docker Compose
