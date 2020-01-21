module.exports = {
  apps: [
    {
      name: 'Worksoft Systems',
      script: '/var/node-app/server/dist/index.js',
      autorestart: true,
      watch: ['/var/node-app/server/dist'],
      watch_delay: 1000,
      max_memory_restart: '3G',
      env: {
        NODE_ENV: 'production',
        PROD_DOMAIN: 'worksoft.systems',
        DEV_DOMAIN: 'localhost',
        PROD_PORT: 4040,
        DEV_SERVER_PORT: 3001,
        DEV_CLIENT_PORT: 3000,
        DEBUG: 'logger'
      }
    }
  ]
};
