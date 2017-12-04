// import { open } from 'inspector';

//基本依赖
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect');
var path = require('path');
var clean = require('gulp-clean');
var changed = require('gulp-changed');
var gulpSequence = require('gulp-sequence');

var config = require('./package.json');

//require.js 打包
var amdOptimize = require("amd-optimize");

//js相关
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

//mock数据
var mockServer = require('gulp-mock-server');

//基本路径配置
var rootPath = 'app';
var version = '';
var opt = {
  loc: rootPath + '/src',//
  build: rootPath + '/build',
  online: 'dist',
  version: version || config.version,
  bsPort: 8009,
  mcPort: 8090
}
//文件路径配置
var filePath = {
  dist: opt.online + '/' + opt.version,

  js: opt.loc + '/components/**/*.js',
  tpl: opt.loc + '/**/*.html',
  less: opt.loc + '/less/**/*.less',
  images: opt.loc + '/**/*.+(png|jpg|gif|ico)',

  outputCss: opt.build + '/style',

  mockMock: rootPath + '/data'
}

//本地服务
gulp.task('webserver', function() {
  gulp.src(rootPath)
    .pipe(webserver({
      livereload: true,
      open: true,
      port: opt.bsPort
    }));
});
gulp.task('connect', function() {
  connect.server({
    root: rootPath,
    livereload: true
  });
});
//本地服务-end

//less 预编译
gulp.task('less', function() {
  return gulp.src(filePath.less)
    .pipe(changed(filePath.outputCss))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(filePath.outputCss));
});

//本地监听-start
gulp.task('watchHtml', function() {
  gulp.src(rootPath + '/*.html')
    .pipe(gulp.dest(rootPath))
    .pipe(connect.reload());
});
gulp.task('watchTpl', function() {
  gulp.src(filePath.tpl)
    .pipe(gulp.dest(opt.build))
    .pipe(connect.reload());
});
gulp.task('watchJs', function() {
  gulp.src(filePath.js)
    .pipe(changed(opt.build + '/components'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest(opt.build + '/components'))
    .pipe(connect.reload())
})
gulp.task('watchCss', function() {
  gulp.src(filePath.outputCss + '/**/*.css')
    .pipe(connect.reload())
})
gulp.task('watchImg', function() {
  return gulp.src(filePath.images)
    .pipe(changed(opt.build))
    .pipe(gulp.dest(opt.build))
})
gulp.task('watch', function () {
  gulp.watch([rootPath + '/*.html'], ['watchHtml']);
  gulp.watch([filePath.tpl], ['watchTpl', 'watchImg'])
  gulp.watch([filePath.js], ['watchJs']);
  gulp.watch([filePath.less], ['less', 'watchCss', 'watchHtml']);
  gulp.watch([filePath.images], ['watchImg']);
});
//本地监听-end

//mock数据
gulp.task('mock', function() {
  gulp.src('.')
  .pipe(mockServer({
      port: opt.mcPort,
      allowCrossOrigin: true,
      mockDir: filePath.mockMock
  }));
});

//js 打包
gulp.task('pubJs', function(cb) {
  pump([
    gulp.src([filePath.js]),
    babel({
      presets: ['env']
    }),
    uglify(),
    gulp.dest(filePath.dist + '/components'),
    amdOptimize(rootPath),
    concat('app.js'),
    uglify(),
    gulp.dest(filePath.dist + '/components')
  ], cb);
});
//tpl 打包
gulp.task('pubTpl', function() {
  return gulp.src(filePath.tpl)
      .pipe(changed(filePath.dist))
      .pipe(gulp.dest(filePath.dist))
});
//css 打包合并
gulp.task('pubCss', ['less'], function() {
  return gulp.src(filePath.outputCss + '/**/*.css')
    .pipe(changed(filePath.dist + '/style'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(filePath.dist + '/style'))
});
//打包img
gulp.task('pubImg', function() {
  return gulp.src(filePath.images)
    .pipe(gulp.dest(filePath.dist))
});

gulp.task('clean', function() {
  return gulp.src(opt.build)
    .pipe(clean());
})

//批量操作
var taskAry = ['watchImg', 'less', 'watchJs', 'watchTpl', 'watchHtml'];
gulp.task('updateBuild', gulpSequence('clean', taskAry.concat()));

gulp.task('default',
  gulpSequence(['updateBuild'], ['webserver', 'connect', 'watch', 'mock'])
);

gulp.task('pub', ['pubJs', 'pubTpl', 'pubCss', 'pubImg']);
