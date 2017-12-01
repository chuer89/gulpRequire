window.DOMAIN = {
  DEV: {
    baseUrl: 'build/js'
  },
  QA: {
    baseUrl: ''
  },
  PUB: {
    baseUrl: 'dist/0.0.1/js'
  }
}

require.config({
  baseUrl: DOMAIN['DEV'].baseUrl,
  paths : {

  }
})

require(['index'])
