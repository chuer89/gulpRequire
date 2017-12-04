window.DOMAIN = {};

(function() {
  let env = {
    DEV: {
      baseUrl: 'build/components',
      host: 'http://localhost:8090/'
    },
    QA: {
      baseUrl: ''
    },
    PUB: {
      baseUrl: 'dist/0.0.1/components'
    }
  };

  if (1) {
    
  }

  window.DOMAIN.env = env['DEV']
})();

require.config({
  baseUrl: DOMAIN.env.baseUrl,
  paths : {

  }
})

require(['index'])
