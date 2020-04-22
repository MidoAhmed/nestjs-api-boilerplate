#!/bin/bash

docker-compose -f docker-compose.production.yml down             #stop containers and remove containers, networks
#docker-compose -f docker-compose.production.yml down --volumes  #stop containers and remove containers, networks, volumes
docker rmi -f momo/nest-api-boilerplate                          #remove the image
docker image prune -f                                            #remove all images without use