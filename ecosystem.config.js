module.exports = {
  apps: [{
    name: 'teajoy',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      MONGODB_URI: 'mongodb://spacefox:goodwin2025@localhost:27017/teajoy?authSource=admin'
    }
  }]
};
