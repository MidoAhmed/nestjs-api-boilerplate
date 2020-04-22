#!/bin/bash

docker-compose -f docker-compose.production.yml build                    #build image 
docker-compose -f docker-compose.production.yml up -d   --force-recreate #run containers
