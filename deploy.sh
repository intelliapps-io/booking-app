#!/bin/sh
# install and build server
cd server && npm i;
npm run gen;
npm run build;

# install and build client
cd .. && cd client && yarn install;
yarn build;
# start server
cd .. && cd server;
