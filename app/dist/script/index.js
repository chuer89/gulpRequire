define('module/b', [], function () {
    'use strict';
    return { b: '22' };
});
define('module/c', ['module/b'], function (b) {
    'use strict';
    console.log('c');
});
define('a', ['module/c'], function (c) {
    $('#js_yibu').on('click', function () {
        require(['module/b']);
    });
});
require.config({
    baseUrl: 'src/js',
    paths: { 'jquery': ['http://libs.baidu.com/jquery/2.0.3/jquery'] }
});
require(['a']);
define('app', ['a'], function () {
    return;
});