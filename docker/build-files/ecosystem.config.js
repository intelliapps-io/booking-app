module.exports = {
  apps: [{
    name: 'Worksoft Systems',
    script: '/var/node-app/server/dist/index.js',
    autorestart: true,
    watch: false,
    max_memory_restart: '3G',
    env: {
      NODE_ENV: 'development',
      PROD_DOMAIN: 'worksoft.systems',
      DEV_DOMAIN: 'localhost',
      PROD_PORT: 8080,
      DEV_SERVER_PORT: 3001,
      DEV_CLIENT_PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};   