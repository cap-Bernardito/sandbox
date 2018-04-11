const gulp = require('gulp');
const debug = require('gulp-debug');
const newer = require('gulp-newer');
const config = require('../config.js');

gulp.task('copy:fonts', function() {
  return gulp
    .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
    .pipe(newer(config.dest.fonts))
    .pipe(debug({ title: 'Copy:Fonts:' }))
    .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:img', function() {
  return gulp
    .src([config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,webp}'])
    .pipe(newer(config.dest.img))
    .pipe(debug({ title: 'Copy:IMG:' }))
    .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy:js', function() {
  return gulp
    .src(config.src.js + '/include/*.js')
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('copy', ['copy:img', 'copy:fonts', 'copy:js']);
gulp.task('copy:watch', function() {
  gulp.watch([
    config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,webp}',
    config.src.fonts + '/**/*.{ttf,eot,woff,woff2}',
    config.src.js + '/**/*.js'
  ], ['copy']);
});
