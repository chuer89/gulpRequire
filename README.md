
# 这里是玩玩 gulp + require.js + mock + es6

* 初始化 npm install
* 本地运行 gulp
* 打包线上 gulp

#### 实现功能

#### 注意事项
* 不支持使用 es6 import export，用require.js代替
* css统一放到less目录下，自动合并app.css统一引用
* view层及模版 放到js目录下，按模块拆分；js目录可支持（图片资源png|jpg|gif、js|es6、m模版*.html）

#### mock 说明
/data/*.json  单个的ajax请求
/data/*.js 格式为module.exports 则已参数形式输出 具体看 <a href="https://github.com/sanyueyu/gulp-mock-server" target="_blank">mock 详情</a>
