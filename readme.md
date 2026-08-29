# Quantis

## Getting Started

### Run project
```bash
# Create a .env file
cp .env.local .env

# Start docker
docker compose up -d
docker compose -f compose.production.yaml up -d

# Apply migration
docker exec -it node npx prisma migrate dev --name init

# Stop docker
docker compose down -v
docker compose -f compose.production.yaml down -v
```

### Usefull commands
```bash
# Log service
docker logs node -f

# Restart service
docker compose restart server
```