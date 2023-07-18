FROM node:18.16-alpine
WORKDIR /usr/src/app

RUN npm install -g next

# COPY package.json yarn.lock ./
# RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]