var fs = require('fs');

var gulp = require('gulp');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var ngConstant = require('gulp-ng-constant');
var rm = require('gulp-rimraf');

var KarmaServer = require('karma').Server;
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var minimist = require('minimist');

var knownOptions = {
  string: 'buildNumber',
  default: {
    buildNumber: 'LOCAL'
  }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('webpack-dev-server', function(callback) {
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;

  new WebpackDevServer(webpack(myConfig), {
    contentBase: 'app/',
    stats: {
      colors: true
    },
    proxy: {
      '/md/*': {
        target: 'http://localhost:9001',
        rewrite: function(req) {
          req.url = req.url.replace(/^\/md/, '');
        }
      }
    },
    historyApiFallback: true
  }).listen(9001, '0.0.0.0', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://127.0.0.1:9001');
  });
});

gulp.task('karma', function(done) {
  var server = new KarmaServer({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: false
  }, done);
  server.start();
});

gulp.task('karma:ci', function(done) {
  var server = new KarmaServer({
    configFile: __dirname + '/test/karma.ci.conf.js',
    singleRun: true
  }, done);
  server.start();
});

gulp.task('clean', function() {
  return gulp.src('dist/*').pipe(rm());
});

gulp.task('package', function(done) {
  webpack(webpackConfig, function(err, stats) {
    if (stats.compilation.errors.length) {
      throw new gutil.PluginError('webpack', stats.compilation.errors.toString());
    }
    if (stats.compilation.warnings.length) {
      gutil.log('[WARNING]', stats.compilation.warnings.toString());
    }
    done();
  });
});

gulp.task('copy:index', () => {
  gulp.src('app/index.html')
    .pipe(replace(/.*webpack-dev-server.js.*\n/gi, ''))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy:json', () => {
  gulp.src('app/*.json')
    .pipe(gulp.dest('dist'));
});

gulp.task('dev:images', () => {
  gulp.src('../md/images/**/*')
    .pipe(gulp.dest('app/images'));
});

gulp.task('copy:images', () => {
  gulp.src('../md/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('copy:html', () => {
  gulp.src('app/html/**/*')
    .pipe(gulp.dest('dist/html/'));
});

gulp.task('build', ['clean'], () => {
  gulp.start(['package', 'copy:index', 'copy:html', 'copy:json', 'copy:images']);
});

gulp.task('serve', ['dev:images', 'webpack-dev-server']);
