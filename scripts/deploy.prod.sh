docker image prune -f
docker-compose -f docker-compose.production.yml build
docker-compose -f docker-compose.production.yml up -d
