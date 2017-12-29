const PROMISE = function(ready) {
  return new Promise(function(resolve, reject) {
    if (ready) {
      resolve();
    } else {
      reject();
    }
  })
}

define(['module/c', 'text!module/tpl.html'],function(c, tpl) {
  $('#tpl').html(template.compile(tpl)({
    title: '2323'
  }));

  $('#js_yibu').on('click', function() {
    require(['module/b', 'api/home'], function(b, api) {
      PROMISE(1)
        .then(function() {
          api.getUser();
        })
        .then(function() {
          $.post(DOMAIN.env.host + '/aa', {}, function(data) {
            console.log(data)
          })
        })
    });
  });

  $('#js-sort-box').sortable({
    axis: 'y',
    cursor: 'move',
    revert: true,
    containment: '.js-box'
    // containerSelector: '#js-sort-box',
    // itemSelector: '.p1',
    // placeholder: '<div class="placeholder"></div>',
    // cancel: 'ul, li'
  })

  $("ul").sortable({
    axis: 'y',
    cursor: 'move',
    revert: true,
    containment: 'parent'
  })
});
