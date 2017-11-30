// import { open } from 'inspector';

//基本依赖
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect');
var path = require('path');
var clean = require('gulp-clean');

//require.js 打包
var amdOptimize = require("amd-optimize");

//js相关
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var less = require('gulp-less');

//mock数据
var mockServer = require('gulp-mock-server');

//基本路径配置
var opt = {
  loc: 'src',//
  version: '0.0.1',
  bsPort: 8009,
  mcPort: 8090
}
var filePath = {
  outpub: opt.loc + '/dist'
}

//本地服务
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8009
    }));
});
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});
//本地服务-end

//less 预编译
gulp.task('less', function () {
  return gulp.src('./app/src/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    // .pipe()
    .pipe(gulp.dest('./app/style'));
});

//本地监听-start
gulp.task('watchTtml', function () {
  gulp.src('./app/*.html')
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload());
});
gulp.task('watchJs', function () {
  gulp.src('./app/src/**/*.js')
    .pipe(connect.reload())
})
gulp.task('watchCss', function () {
  gulp.src('./app/style/**/*.css')
    .pipe(connect.reload())
})
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['watchTtml']);
  gulp.watch(['./app/src/**/*.js'], ['watchJs']);
  gulp.watch(['./app/src/**/*.less'], ['less', 'watchCss'])
});
//本地监听-end

//脚本检查  
gulp.task('lint', function () {  
  gulp.src('./src/js/**/*.js')  
      .pipe(jshint())  
      .pipe(jshint.reporter('default'));  
});

//mock数据
gulp.task('mock', function() {
  gulp.src('.')
  .pipe(mockServer({
      port: 8090,
      path: './app/data',
      mockDir: './app/data'
  }));
});

//js打包
gulp.task('scripts', function () {
  return gulp.src('app/src/js/**/*.js')
      .pipe(amdOptimize("app", {

      }))
      .pipe(concat('index.js'))
      .pipe(gulp.dest('app/dist/script'))
});

gulp.task('default', ['webserver', 'connect', 'watch', 'mock'], function () {
  //
})

gulp.task('pub', ['scripts']);