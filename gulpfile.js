var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var include = require('gulp-include-source');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;

var yeoman = {
  src: 'src',
  app: 'app',
  dev: 'www',
  prod: 'prod',
  output: 'www'
};

var paths = {
  sass: ['./scss/**/*.scss'],
  scripts: [yeoman.src + '/js/**/*.js'],
  styles: [yeoman.src + '/css/**/*.css'],
  app_modules: [yeoman.src + '/app_modules/**/*'],
  main: yeoman.src + '/index.html'
};

///////////
// Tasks //
///////////

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(yeoman.output + "/css/"))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(yeoman.output + "/css/"))
    .on('end', done);
});

gulp.task('watch', ['sass'], function () {
  gulp.watch(paths.sass, ['sass']);
});

// inject bower components
gulp.task('bower', function () {
  return gulp
    .src(paths.main)
    .pipe(
      wiredep({
        directory: 'bower_components',
        ignorePath: '../',
        devDependencies: true
      })
    )
    .pipe(gulp.dest(yeoman.src));
});

gulp.task('clean:dev', function (cb) {
  rimraf(yeoman.dev, cb);
});

gulp.task('clean:prod', function (cb) {
  rimraf(yeoman.prod, cb);
});

gulp.task(
  'client:build:dev',
  ['copy:styles', 'copy:scripts', 'copy:bower'],
  function () {
    return gulp
      .src(paths.main)
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest(yeoman.output));
  }
);

gulp.task('copy:app_modules', function () {
  return gulp
    .src(paths.app_modules)
    .pipe(gulp.dest(yeoman.output + '/app_modules'));
});

gulp.task('copy:lib', function () {
  return gulp
    .src(yeoman.src + '/lib/**/*')
    .pipe(gulp.dest(yeoman.output + '/lib'));
});

gulp.task('copy:styles', function () {
  return gulp.src(paths.styles).pipe(gulp.dest(yeoman.output + '/css'));
});

gulp.task('copy:scripts', function () {
  return gulp.src(paths.scripts).pipe(gulp.dest(yeoman.output + '/js'));
});

gulp.task('copy:bower', function () {
  return gulp
    .src(['bower_components/**/*'])
    .pipe(gulp.dest(yeoman.output + '/bower_components'));
});

///////////
// Build //
///////////

gulp.task('build:dev', function () {
  yeoman.output = yeoman.dev;
  runSequence('clean:dev', ['bower', 'copy:app_modules', 'copy:lib'], 'client:build:dev');
});

gulp.task('default', ['build:dev']);
