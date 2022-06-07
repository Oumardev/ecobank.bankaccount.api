require('dotenv').config();

module.exports = {
  apps : [{
    script: 'main.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : process.env.USER_SERVER,
      host : process.env.SERVER_ADDRESS,
      ref  : 'origin/main',
      repo : 'git@github.com:Oumardev/ecobank.bankaccount.api.git',
      path : process.env.PATH_DEPLOY,
      'post-deploy' : 'npm install'
    }
  }
};
