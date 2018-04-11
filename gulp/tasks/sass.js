const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const csso = require('postcss-csso');
const env = require('gulp-environment');
const config = require('../config');

let postcssParams = [
  autoprefixer({
    browsers: ['last 4 versions'],
    cascade: true
  }),
  mqpacker({
    sort: sortMediaQueries
  }),
  csso
];

if (env.is.development()) {
  postcssParams.pop();
}

gulp.task('sass', function() {
  return (gulp
      .src(config.src.sass + '/*.{sass,scss}')
      .pipe(env.if.development(sourcemaps.init()))
      .pipe(sass({ outputStyle: 'expanded', precision: 5 })) // 'expanded', nested, expanded, compact, compressed
      .on('error', config.errorHandler)
      .pipe(postcss(postcssParams))
      // .pipe(rename('style.min.css'))
      .pipe(env.if.development(sourcemaps.write('./')))
      .pipe(gulp.dest(config.dest.css)) );
});

gulp.task('sass:watch', function() {
  gulp.watch(config.src.sass + '/**/*.{sass,scss}', { readDelay: 100 }, ['sass']);
});

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
  A = a.replace(/\D/g, '');
  B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }

  return 1;
}
