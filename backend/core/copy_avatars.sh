#!/bin/bash

# Verifica se il file anon.jpeg esiste già
if [ ! -f /core/media/avatars/anon.jpeg ]; then
  echo "Copia di anon.jpeg nella cartella media/avatars"
  mkdir -p /core/media/avatars
  cp /core/anon.jpeg /core/media/avatars/anon.jpeg
fi

# Esegui il comando successivo
exec "$@"
