var fs = require('fs');

var gulp = require("gulp");
var gutil = require("gulp-util");
var rename = require('gulp-rename');
var git = require('gulp-git');
var ngConstant = require('gulp-ng-constant');
var rm = require('gulp-rimraf');

var KarmaServer = require('karma').Server;
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var minimist = require('minimist');

var knownOptions = {
  string: 'buildNumber',
  default: { buildNumber: 'LOCAL' }
};

var options = minimist(process.argv.slice(2), knownOptions);

var versionMajorMinor = fs.readFileSync(__dirname + '/VERSION');
var gitHash = '';

gulp.task("webpack-dev-server", function(callback) {
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	new WebpackDevServer(webpack(myConfig), {
		contentBase: 'app/',
		stats: {
			colors: true
		}
	}).listen(9001, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://127.0.0.1:9001");
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

gulp.task("clean", function() {
    return gulp.src('dist/*').pipe(rm());
});

gulp.task("package", ["clean", "version"], function(done) {
    webpack(webpackConfig, function(err, stats) {
        if (stats.compilation.errors.length) {
            throw new gutil.PluginError('webpack', stats.compilation.errors.toString());
        }
        if (stats.compilation.warnings.length) {
            gutil.log('[WARNING]', stats.compilation.warnings.toString())
        }
        done();
    });
});

gulp.task("githash", function(done) {
	git.exec({args: 'rev-parse --short HEAD'}, function(err, stdout) {
		gitHash = stdout;
		done();
	});
});

gulp.task('version', ["githash"], function() {
	return ngConstant({
		name: 'version',
		constants: {
			versionNumber: {
				version: versionMajorMinor + options.buildNumber,
				gitHash: gitHash.trim()
			}
		},
		wrap: 'commonjs',
		stream: true
	})
	.pipe(rename({
		basename: 'version-service',
		extname: '.js'
	}))
	.pipe(gulp.dest('./app/services/'));
});

gulp.task("build", ["package"]);

gulp.task("serve", ["webpack-dev-server"]);
