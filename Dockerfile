FROM node:14.17.1-alpine3.13
WORKDIR /library-api
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV PORT=3001
EXPOSE 3001
CMD [ "npm", "run", "start" ]