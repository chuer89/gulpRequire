define(['module/c'],function(c) {
  $('#js_yibu').on('click', function() {
    require(['module/b', 'text!module/tpl.html'], function(b, tpl) {
      console.log(b, tpl)
    });
  })
});
