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
      user : 'root',
      host : '86.107.197.161',
      ref  : 'origin/master',
      repo : 'git@github.com:Oumardev/ecobank.bankaccount.api.git',
      path : '/home/ecobank.bankaccount.api/',
      'post-deploy' : 'npm install'
    }
  }
};
