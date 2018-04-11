const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');
const htmlhint = require('gulp-htmlhint');
const config = require('../config');

gulp.task('lint:sass', function() {
  return gulp
    .src('src/sass/**/*.s+(a|c)ss')
    .pipe(
      sassLint({
        options: {
          configFile: '.sass-lint.yml'
        }
      })
    )
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('lint:html', function() {
  return gulp
    .src(config.dest.html + '/*.html')
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter());
});

gulp.task('lint', ['lint:sass', 'lint:html']);
