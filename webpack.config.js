const webpack = require('webpack');
const path = require('path');
const env = require('gulp-environment');
const config = require('./gulp/config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// uncomment in case of emergency code formatter need
// const PrettierPlugin = require('prettier-webpack-plugin');

function createConfig(env) {
  var isProduction, webpackConfig;

  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  isProduction = env === 'production';

  webpackConfig = {
    context: path.join(__dirname, config.src.js),
    entry: {
      vendor: ['jquery'],
      app: './app.js'
    },
    output: {
      path: path.join(__dirname, config.dest.js),
      filename: '[name].js',
      publicPath: 'js/'
    },
    devtool: isProduction ? '#source-map' : '#cheap-module-eval-source-map',
    plugins: [
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery',
      //   'window.jQuery': 'jquery'
      // }),
      new webpack.NoEmitOnErrorsPlugin(),

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false
      })
    ],
    resolve: {
      // extensions: ['.js'],
      // alias: {
      //   TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      //   TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      //   TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      //   TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      //   ScrollMagic: path.resolve(
      //     'node_modules',
      //     'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
      //   ),
      //   'animation.gsap': path.resolve(
      //     'node_modules',
      //     'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'
      //   ),
      //   'debug.addIndicators': path.resolve(
      //     'node_modules',
      //     'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
      //   )
      // }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [path.resolve(__dirname, 'node_modules')]
        },
        {
          test: require.resolve('jquery'),
          use: [
            {
              loader: 'expose-loader',
              options: 'jQuery'
            },
            {
              loader: 'expose-loader',
              options: '$'
            },
          ]
        }
      ]
    }
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    );
  }

  return webpackConfig;
}

module.exports = createConfig(env.current.name);
module.exports.createConfig = createConfig;
