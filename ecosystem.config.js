module.exports = {
  apps: [{
    name: 'Worksoft Systems',
    script: '/var/node-app/server/dist/index.js',
    instances: 1,
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
  }],

  // deploy: {
  //   production: {
  //     user: 'ubuntu',
  //     host: 'worksoftsystems.mynetgear.com',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:intelliapps-io/booking-app.git',
  //     path: '/home/node/booking-app',
  //     'post-deploy': 'pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
