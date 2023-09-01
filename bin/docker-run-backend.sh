#!/bin/bash

FILE=config.env

# Entra na pasta bin
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

# Criandos pastas configurações
mkdir -p ../backend/tmp/postgres
mkdir -p ../backend/frontend

# Troca para a pasta docs
yes | cp -rf ../frontend_web/build/* ../backend/frontend 

# Troca para a pasta docs
cd ../backend/docker

# Inicia a aplicação

if test -f ".env"; then
    docker-compose --env-file .env up
else
    docker-compose --env-file .env.dev up
fi