window.DOMAIN = {
  DEV: {
    baseUrl: 'build/components'
  },
  QA: {
    baseUrl: ''
  },
  PUB: {
    baseUrl: 'dist/0.0.1/components'
  }
}

require.config({
  baseUrl: DOMAIN['DEV'].baseUrl,
  paths : {

  }
})

require(['index'])
