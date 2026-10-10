# Quantis: Fullstack Medication Tracking CRM

Quantis is a fullstack CRM application designed for the efficient tracking and accounting of medications.

## Technologies & Tools
- React
- Node.js, Express
- PostgreSQL, Prisma ORM
- Docker

## Methodologies & Architecture
- Feature-Sliced Design
- 3-Layer Architecture
- Ledger Pattern

## Getting Started
```bash
# Create a .env file
cp .env.local .env

# Start docker
docker compose up -d
docker compose -f compose.production.yaml up -d

# Add migration
docker exec -it node npx prisma migrate dev --name init

# Apply migration
docker exec -it node npx prisma db push

# Deploy migration
docker exec -it node npx prisma migrate deploy

# Stop docker
docker compose down -v
docker compose -f compose.production.yaml down -v

# Log service
docker logs node -f

# DB CLI
docker exec -it postgres psql -U [DB_USER] -d [DB_NAME]
```