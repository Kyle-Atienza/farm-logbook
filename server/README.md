# Farm Logbook Server

Simple Express server exposing CRUD endpoints for `/harvests`.

This server has been converted to TypeScript and integrated with Prisma + PostgreSQL.

Quick start (development):

```bash
cd server
npm install
# set DATABASE_URL env var, e.g. export DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Endpoints (same as before):
- `GET /harvests` — list all
- `GET /harvests/:id` — get by id
- `POST /harvests` — create
- `PUT /harvests/:id` — update
- `DELETE /harvests/:id` — delete

Notes:
- Set `DATABASE_URL` to your Postgres connection string before running migrations.
- Local development: SQLite can be used by changing `prisma/schema.prisma` datasource to `provider = "sqlite"` and pointing `url` to a file, but Postgres is recommended for production.
