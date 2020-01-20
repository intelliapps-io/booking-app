module.exports = {
  apps: [
    {
      name: 'Git Watcher',
      script: '/var/node-app/watcher/dist/index.js',
      autorestart: true,
      watch: false,
      max_memory_restart: '4G',
      env: {
        NODE_ENV: 'production',
        PORT: 9001
      }
    }
  ]
};
