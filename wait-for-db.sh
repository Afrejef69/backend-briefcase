#!/bin/bash

until nc -z -v -w30 db 5432; do
    echo 'Waiting for PostgreSQL...'
    sleep 5
done

npm run migration:generate
npm run migration:run

exec "$@"