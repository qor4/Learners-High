FROM node:18
WORKDIR ./
COPY package*.json .
RUN npm install --force
RUN npm install react-app-rewired --save-dev
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]


FROM node:18.13-alpine as builder

WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install --force
COPY . /usr/src/app
RUN npm run build
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
