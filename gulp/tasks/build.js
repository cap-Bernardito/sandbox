const gulp = require('gulp');
const runSequence = require('run-sequence');
const env = require('gulp-environment');
const config = require('../config');

function build(cb) {
  // runSequence( 'webpack', cb);
  // runSequence('clean', 'sass', cb);
  runSequence(
    'clean',
    'sprite:svg',
    'sass',
    'nunjucks',
    'copy',
    'lint',
    'webpack',
    cb
  );
}

gulp.task('production', function(cb) {
  build(cb);
});

gulp.task('development', function(cb) {
  build(cb);
});
