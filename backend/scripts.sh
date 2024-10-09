#!/bin/bash

case $1 in
   -b|--build)
        docker compose -f docker-compose.dev.yml up -d --build
   ;;
   -t| --terminal)
            echo "Use Ctrl+D para sair do container"

        if [ $2 == "--app" ]; then
            docker exec -it app-reviews  /bin/bash
        elif [ $2 == "--db" ]; then
            docker exec -it db-reviews  /bin/bash
        else
            echo "Container Inválido. Execute -h para ver opções."
        fi
   ;;
   -l| --logs)
        echo "Use Ctrl+C para sair do container"

        if [ $2 == "--app" ]; then
            docker logs -f app-reviews
        elif [ $2 == "--db" ]; then
            docker logs -f db-reviews
        else
            echo "Container Inválido. Execute -h para ver opções."
        fi
   ;;
   -d|--down)
        docker compose -f docker-compose.dev.yml down
   ;;
   -r | --remove)
        docker volume prune -a
        docker image prune
        docker container prune
   ;;
   -h|--help)
    	echo "
   start.sh [ -b | -t [ --app | --db ] | -l [ --app | --db ] | -d | -r | -h ]

    -b   | --build      Builda a imagem Docker;
    -t   | --terminal   Abre o terminal do container app-reviews ou db-reviews, para ver e manipular arquivos;
    -l   | --logs       Abre os logs in real-time do container app-reviews ou db-reviews;
    -d   | --down       Executa o docker compose down;
    -r   | --remove     Remove os arquivos criados no build e não excluídos no down;
    -h   | --help       Imprime esta mensagem de ajuda.
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