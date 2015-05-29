/*global require __dirname*/
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./www/js/**/*.js', './test/**/*.js', './gulpfile.js']
};

/**
 * bower install
 */
gulp.task('install', function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

/**
 * watch task
 */
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

/**
 * scss to css
 */
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

/**
 * livereload server
 */
gulp.task('livereload', function() {
  var source = ['www/**/*.html', 'www/**/*.js'];
  gulp.src(source)
    .pipe(watch(source))
    .pipe(connect.reload());
});

gulp.task('server:livereload', ['livereload'], function() {
  connect.server({
    root: 'www',
    livereload: true
  });
});

/**
 * gulp default task
 */
gulp.task('default', ['server:livereload', 'watch']);
