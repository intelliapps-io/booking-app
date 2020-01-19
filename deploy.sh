#!/bin/sh
# install and build server
cd ./server && npm i;
npm run gen;
npm run build;

# install and build client
cd ../client && yarn install;
yarn build;
