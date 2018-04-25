module.exports = function (gulp, plugins) {
  return function () {
    gulp.src('dev/data/**/*.json')
    .pipe(plugins.jsonConcat('db.json',function(data){
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(gulp.dest('dev/db'))
    .pipe(plugins.browserSync.reload({ stream: true }));
  }
}
