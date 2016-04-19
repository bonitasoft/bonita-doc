var webpack = require('webpack');
var path = require('path');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      './spec/tests.webpack.js'
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      './spec/tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
          },
          {
              test: /.html$/,
              loader: 'ngtemplate?relativeTo=/app!html?root=' + __dirname + '/../app'
          },
          {
              test: /\.scss$/,
              loaders: ["style", "css", "sass"]
          },
          {
              test: /\.png$/,
              loader: 'file-loader'
          }
        ]
      },
      resolve: {
          root: path.resolve('app/'),
          extensions: ['', '.js']
      },
      plugins: [
          new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery',
              'window.jQuery': 'jquery'
          })
      ],
      watch: true,
      sassLoader: {
          includePaths: [path.resolve(__dirname, "../app")]
      }
    },
    webpackServer: {
      noInfo: true,
    }
  });
};
