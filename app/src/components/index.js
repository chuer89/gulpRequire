const PROMISE = function(ready) {
  return new Promise(function(resolve, reject) {
    if (ready) {
      resolve();
    } else {
      reject();
    }
  })
}

define(['module/c'],function(c) {
  $('#js_yibu').on('click', function() {
    require(['module/b', 'api/home'], function(b, api) {
      console.log(b, api);
      PROMISE(1)
        .then(function() {
          api.getUser();
        })
        .then(function() {
          $.post(DOMAIN.env.host + 'aa', {}, function(data) {
            console.log(data)
          })
        })
        .then(function() {
          require(['text!module/tpl.html'], function(tpl) {
            console.log(tpl);
          })
        })
    });
  })
});
