window.DOMAIN = {};

(function() {
  let env = {
    DEV: {
      baseUrl: 'build/components',
      host: 'http://localhost:8009'
    },
    QA: {
      baseUrl: ''
    },
    PUB: {
      baseUrl: './1.0.0/components'
    }
  };

  if (1) {

  }

  window.DOMAIN.env = env['DEV']
})();

require.config({
  baseUrl: DOMAIN.env.baseUrl
})

require(['index'])
