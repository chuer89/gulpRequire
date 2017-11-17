//
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect');

var amdOptimize = require("amd-optimize");
var concat = require('gulp-concat');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
});

//脚本检查  
gulp.task('lint', function () {  
  gulp.src('./src/js/**/*.js')  
      .pipe(jshint())  
      .pipe(jshint.reporter('default'));  
});

//js打包ß
gulp.task('scripts', function () {
  return gulp.src('app/src/js/**/*.js')
      .pipe(amdOptimize("app", {

      }))
      .pipe(concat('index.js'))
      .pipe(gulp.dest('app/dist/script'))
});

gulp.task('default', ['webserver', 'connect', 'watch'], function () {
  //
})