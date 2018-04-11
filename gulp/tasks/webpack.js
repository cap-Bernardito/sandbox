const gulp = require('gulp');
const webpack = require('webpack');
const notify = require('gulp-notify');
const env = require('gulp-environment');
const server = require('./server');
const webpackConfig = require('../../webpack.config').createConfig;

function handler(err, stats, cb) {
  const errors = stats.compilation.errors;

  if (errors.length > 0) {
    notify
      .onError({
        title: 'Webpack Error',
        message: '<%= error.message %>',
        sound: 'Submarine'
      })
      .call(null, errors[0]);
  }

  console.log(
    '[webpack]',
    stats.toString({
      colors: true,
      chunks: false
    })
  );

  server.reload();
  if (typeof cb === 'function') cb();
}

gulp.task('webpack', function(cb) {
  webpack(webpackConfig(env.current.name)).run(function(err, stats) {
    handler(err, stats, cb);
  });
});

gulp.task('webpack:watch', function() {
  webpack(webpackConfig(env.current.name)).watch(
    {
      aggregateTimeout: 100,
      poll: false
    },
    handler
  );
});
