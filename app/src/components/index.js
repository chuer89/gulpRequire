define(['module/c'],function(c) {
  $('#js_yibu').on('click', function() {
    require(['module/b', 'text!module/tpl.html', 'api/home'], function(b, tpl, api) {
      console.log(b, tpl, api);
      api.getUser();
    });
  })
});
