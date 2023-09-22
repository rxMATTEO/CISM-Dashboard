FROM node:16-alpine
MAINTAINER rxMATTEO
RUN mkdir /dashboard-app
WORKDIR /dashboard-app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run","dev"]