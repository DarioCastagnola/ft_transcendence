#!/bin/sh
HOST=$1
PORT=$2
shift 2

echo "Waiting for database at $HOST:$PORT..."
while ! timeout 1 bash -c "</dev/tcp/$HOST/$PORT" >/dev/null 2>&1; do
  sleep 2
done

echo "Database is ready!"
exec "$@"
