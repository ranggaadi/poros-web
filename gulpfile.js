const { task, src, dest, series, watch } = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const $ = require('gulp-load-plugins')({
  rename: {
    'gulp-html-tag-include': 'include',
    'gulp-line-ending-corrector': 'lec'
  }
});

task('html', function () {
  return src('src/html/*.html')
    .pipe($.plumber())
    .pipe($.include())
    .pipe($.lec())
    .pipe(dest('app'))
});

task('sass', function () {
  return src('src/scss/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass().on('error', function (err) {
      log.error(err.message);
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
});

task('reload', function (done) {
  browserSync.reload();
  done();
})

task('build', series('sass', 'html', 'reload'));

task('useref', function () {
  return src('app/*.html')
    .pipe($.plumber())
    .pipe($.useref())
    .pipe($.if('*.js', $.terser()))
    .pipe($.if('*.css', $.cssnano({
      discardComments: {
        removeAll: true
      },
      discardDuplicates: true,
      discardEmpty: true,
      minifyFontValues: true,
      minifySelectors: true
    })))
    .pipe($.htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest('dist'))
});

task('deploy', series('build', 'useref'), function (callback) {
  callback();
});

task('clean:dist', function () {
  return del.sync('dist');
})

task('serve', function () {
  browserSync.init({
    server: "./app"
  });
  watch(["src/scss/**/*.scss", 'src/html/**/*.html'], { delay: 200 }, series('build'));
});
