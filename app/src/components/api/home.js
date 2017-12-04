define([], function() {
  return {
    getUser(param) {
      $.post(DOMAIN.env.host + 'user', {}, function(data) {
        console.log(data)
      })
    }
  }
})
