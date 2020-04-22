FROM node:12
#ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package*.json", "./"]
RUN npm install --silent
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]