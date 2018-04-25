module.exports = function (gulp, plugins) {
  return function () {
    gulp.src('dev/scss/**/*.scss')
      .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError("Error: <%= error.message %>"
      )}))
      .pipe(plugins.sourcemaps.init())
      // .pipe(plugins.sassImportJson())//add plugin before sass render
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer(['last 2 versions'], {cascade: true}))
      .pipe(plugins.concat('style.min.css'))
      .pipe(plugins.cssnano())
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest('public/css/'))
      .pipe(plugins.browserSync.reload({ stream: true }))
  };
};
