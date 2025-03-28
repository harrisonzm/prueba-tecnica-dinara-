#!/bin/sh
set -e
export PGPASSWORD="${POSTGRES_PASSWORD:-postgres}"

# Function to wait for Postgres to be ready
wait_for_postgres() {
  echo "Waiting for Postgres at ${POSTGRES_HOST}:${DB_PORT}..."
  while true; do
    pg_isready -h "${POSTGRES_HOST}" -p "${DB_PORT}"
    RESULT=$?
    if [ $RESULT -eq 0 ]; then
      echo "Postgres is up and ready!"
      break
    else
      echo "pg_isready returned $RESULT, sleeping..."
      sleep 1
    fi
  done
}


# Wait until Postgres is ready
wait_for_postgres

# Run Prisma migrations and generate client if using Prisma
if [ -f "prisma/schema.prisma" ]; then
  if [ "$TABLE_COUNT" -eq 0 ]; then
    echo "Database schema is empty. Running Prisma migrations..."
    npx prisma migrate deploy
    echo "Generating Prisma client..."
    npx prisma generate
  else
    echo "Database schema is not empty. Skipping migrations."
  fi
fi

# Start the NestJS application
echo "Starting NestJS..."
npm run start:prod
