const gulp = require('gulp');

gulp.task('watch', [
  'copy:watch',
  'sprite:svg:watch',
  'nunjucks:watch',
  'webpack:watch',
  'sass:watch'
]);
