#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CDIR=$( pwd )
cd $DIR

# Check if no parameters were given
if [ $# -ne 1 ]; then
    echo "  Parâmetro recebido inválido.
    Execute o script com -h para ver opções.
    "
    exit 1
fi

case $1 in
   -b|--build)
      docker compose up -d --build
   ;;
   -t| --terminal)
      echo "Use Ctrl+D para sair do container"
      docker exec -it app-reviews  /bin/bash
   ;;
   -l| --logs)
      echo "Use Ctrl+C para sair do container"
      docker logs -f app-reviews 
   ;;
   -d|--down)
      docker compose down
   ;;
   -r | --remove)
      docker volume prune -a
      docker image prune
      docker container prune
   ;;
   -h|--help)
    	echo "
   start.sh [ -b | -t | -l | -d | -r | -h ]

    -b   | --build      Builda a imagem Docker
    -t   | --terminal   Abre o terminal do container dev-mapas-1, para ver e manipular arquivos
    -l   | --logs       Abre os logs in real-time do container dev-mapas-1
    -d   | --down       Executa o docker compose down
    -r   | --remove     Remove os arquivos criados no build e não excluídos no down
    -h   | --help       Imprime esta mensagem de ajuda
   "
      exit
   ;;
   *)
      echo "
   Parâmetro inválido
         
   Veja -h para parâmetros válidos.
   "
      exit 1
   ;;
esac

cd $CDIR
