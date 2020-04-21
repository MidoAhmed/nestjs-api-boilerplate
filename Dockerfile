FROM node:12 as development
WORKDIR /usr/src/app
COPY ["package*.json", "./"]
RUN npm install --silent
COPY . .
RUN npm run build

FROM node:12 as production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package*.json", "./"]
RUN npm install --silent
COPY . .
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]