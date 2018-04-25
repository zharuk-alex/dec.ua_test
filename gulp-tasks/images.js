module.exports = function(gulp, plugins) {
  return function() {
    gulp.src('./dev/images/**/*')
    .pipe(plugins.cache(plugins.imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [
        {
          removeViewBox: false
        }
      ],
      use: [plugins.pngquant]
    })))
    .pipe(gulp.dest('./public/images'))
    .pipe(plugins.browserSync.reload({ stream: true }));
  }
}
