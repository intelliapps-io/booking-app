mkdir /var/node-app/server_temp;
rsync -av --progress /var/node-app/server/. /var/node-app/server_temp --exclude node_modules;
cd /var/node-app/server_temp;
npm i;
npm run gen;
npm run build;