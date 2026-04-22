# Kuyheng Cafe

Kuyheng Cafe is a React + TypeScript web app with a public cafe website and admin panel.

This project now uses a Node API (`server/index.js`) with PostgreSQL.

## Environment Variables

Copy `.env.example` into `.env` and set your PostgreSQL values.

Required for local PostgreSQL database named `Cafe`:

```env
PGHOST=127.0.0.1
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your-password
PGDATABASE=Cafe
PGSSL=false
API_PORT=3001
```

## Development

1. Install dependencies:

```bash
npm install
```

2. Run API server (Terminal 1):

```bash
npm run dev:api
```

3. Run frontend (Terminal 2):

```bash
npm run dev:web
```

Vite proxies `/api` to `http://localhost:3001` in development.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```
