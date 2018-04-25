module.exports = function (gulp, plugins) {
    return function () {
      gulp.src('public/*.html', {read: false})
        .pipe(plugins.clean())
    }
  }
