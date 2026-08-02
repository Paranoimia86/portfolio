# SaaS Project Manager

Fullstack aplikácia na správu projektov (React + Node.js/Express + MongoDB).

## Štruktúra projektu

```
.
├── client/     # Frontend aplikácia (React + Vite + Tailwind)
├── server/     # Backend aplikácia (Node.js/Express + MongoDB)
└── README.md
```

## Požiadavky

- Node.js 18+
- MongoDB inštancia (lokálna alebo MongoDB Atlas)

## Rýchly štart

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
```

Uprav `.env`:
- `MONGO_URI` – pripojovací reťazec na vlastnú MongoDB (lokálnu alebo Atlas)
- `JWT_SECRET`, `REFRESH_TOKEN_SECRET` – vlastné náhodné reťazce

```bash
npm run dev
```

Server beží na http://localhost:5000

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Frontend beží na adrese, ktorú vypíše Vite (predvolene http://localhost:5173).

## Technológie

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT autentifikácia
