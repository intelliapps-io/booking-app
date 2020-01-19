#!/bin/sh
# install and build server
cd /var/node-app/server && npm i;
npm run gen;
npm run build;

# install and build client
cd /var/node-app/client && yarn install;
yarn build;