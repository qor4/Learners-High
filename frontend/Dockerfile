FROM node:14
WORKDIR ./
COPY package*.json .
RUN npm install --force
COPY . .
RUN npm run build
EXPOSE 80
CMD ["npm", "start"]