module.exports = function (gulp, plugins) {
    return function () {
      gulp.src('dev/data.json', {read: false})
        .pipe(plugins.clean())
    }
  }
