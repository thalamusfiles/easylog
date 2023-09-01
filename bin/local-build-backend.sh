#!/bin/bash

# Entra na pasta bin
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"
echo "$parent_path"

# Troca para a pasta do frontend
cd ../backend

# Inicia a aplicação
yarn

# Inicia a aplicação
yarn build
