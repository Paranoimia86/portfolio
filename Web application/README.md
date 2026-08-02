# Web Application with Docker

Projekt aplikácie s Docker kompositeom pozostávajúcim z troch kontajnerov: backend, frontend a PostgreSQL databázy.

## Požiadavky

- Docker Desktop alebo Docker Engine
- Docker Compose (v3.8+)

## Štruktúra projektu

```
.
├── client/                 # Frontend aplikácia (React)
├── server/                 # Backend aplikácia (Node.js)
├── docker-compose.yml      # Docker Compose konfigurácia
├── .env.example            # Príklad environment premenných
└── README.md              # Tento súbor
```

## Rýchly štart

### 1. Klon a nastavenie

```bash
# Vytvoriť .env súbor z príkladu
cp .env.example .env

# Alebo upraviť prostredníctvom editora s vlastnými hodnotami
```

### 2. Spustenie Docker kontajnerov

```bash
# Spustiť všetky služby
docker-compose up -d

# Alebo bez detach módu (vidieť logy v reálnom čase)
docker-compose up
```

### 3. Prístup k aplikáciam

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **PostgreSQL**: localhost:5432

## Env premenné

Upraveň `.env` súbor pre vlastnú konfiguráciu:

```env
DB_USER=postgres              # PostgreSQL užívateľ
DB_PASSWORD=postgres          # PostgreSQL heslo
DB_NAME=app_db                # Názov databázy
API_PORT=5000                 # Backend port
NODE_ENV=development          # Environment
REACT_APP_API_URL=...         # Frontend API URL
```

## Užitočné príkazy

```bash
# Spustenie všech služieb
docker-compose up -d

# Zastavenie všech služieb
docker-compose down

# Zobrazenie logov
docker-compose logs -f

# Logy konkrétneho kontajnera
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database

# Reštart služieb
docker-compose restart

# Rebuild obrazov
docker-compose up -d --build

# Prístup do kontajnera (bash)
docker-compose exec backend bash
docker-compose exec frontend bash
docker-compose exec database psql -U postgres -d app_db
```

## Databáza

### Inicializácia

Databáza sa automaticky inicializuje zo súboru `server/src/database/init.sql` pri prvom spustení.

### Podľa údajov z PostgreSQL

```bash
# Prístup do databázy
docker-compose exec database psql -U postgres -d app_db

# Alebo s heslom
docker-compose exec database psql -U postgres -d app_db -W
```

## Troubleshooting

### Porty sú už obsadené

Ak sú porty 3000, 5000 alebo 5432 už používané, zmeňte ich v `docker-compose.yml`:

```yaml
ports:
  - "8000:5000" # Backend na porte 8000
  - "8080:3000" # Frontend na porte 8080
  - "5433:5432" # Database na porte 5433
```

### Vyčistenie všetkého

```bash
# Zastavenie a odstránenie kontajnerov a volumes
docker-compose down -v

# Odstránenie obrazov
docker-compose down -v --rmi all
```

## Technológie

- **Frontend**: Node.js, React
- **Backend**: Node.js, Express (príklad)
- **Databáza**: PostgreSQL 15
- **Orchestration**: Docker Compose

## Vývoj

### Backend

Umiestnite svoj Node.js backend kód do zložky `server/`. Kontajner automaticky nainštaluje závislosti a spustí vývojový server s live reload.

### Frontend

Umiestnite svoj React kód do zložky `client/`. Frontend sa automaticky privedie s hot reload.

### Databáza

SQL skripty sa nájdú v `server/src/database/init.sql` a automaticky sa spustia pri inicializácii.

## Poznámky

- Databázové dáta sú trvalé v volume `postgres_data`
- Backend a frontend majú automatický restart pri zlyhaní
- Všetky kontajnery sú v tej istej sieti `app_network` pre komunikáciu
- Vývojový režim má povolenou synchronizáciu súborov cez volumes
