const gulp = require('gulp');
const del = require('del');
const colors = require('ansi-colors-lazy');
const config = require('../config');

gulp.task('clean', function(cb) {
  return del([config.dest.root]).then(function(paths) {
    console.log(colors.red(`Deleted: ${paths.join('\n')}`));
  });
});
