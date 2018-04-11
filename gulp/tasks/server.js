const gulp = require('gulp');
const server = require('browser-sync').create();
const config = require('../config');

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me

const isTunnel = false;

gulp.task('server', function() {
  server.init({
    server: {
      baseDir: config.dest.root,
      directory: false,
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    files: [config.dest.html + '/*.html', config.dest.css + '/*.css', config.dest.img + '/**/*'],
    port: 8080,
    logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
    logPrefix: 'Dev Server',
    logConnections: false,
    logFileChanges: true,
    open: isTunnel, // true, local, external, ui, ui-external, tunnel, false
    notify: false,
    ghostMode: false,
    online: true, // isTunnel
    tunnel: isTunnel || null,
    injectChanges: !false
  });
});

gulp.task('server-www', function() {
  server.init({
    proxy: 'http://www.apra-it.com',
    serveStatic: [config.dest.css],
    files: [config.dest.css + '/*.css'],
    middleware: require('serve-static')('./build'),
    rewriteRules: [
      {
        match: new RegExp('/tpl/css/style.css'),
        fn: function() {
          return '/css/app.css';
        }
      }
    ],
    port: 8080,
    injectChanges: false,
  });
});

module.exports = server;
