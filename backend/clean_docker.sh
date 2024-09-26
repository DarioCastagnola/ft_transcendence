#!/bin/bash
#newgrp docker

# Stoppa tutti i container in esecuzione
docker stop $(docker ps -aq)

# Rimuove tutti i container
docker rm $(docker ps -aq)

# Rimuove tutte le immagini
docker rmi $(docker images -q) --force

# Pulisce tutti i volumi
docker volume prune -f

# Pulisce tutte le network
docker network prune -f

echo "Tutte le immagini, i container, i volumi e le network sono stati rimossi."

