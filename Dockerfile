FROM node:18.16-alpine
WORKDIR /usr/src/app

# Next.jsをグローバルにインストール
RUN npm install -g next

# アプリケーションの依存関係をインストール
COPY package.json yarn.lock ./
RUN yarn install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションの起動
CMD yarn dev