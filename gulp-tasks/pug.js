const fs = require('fs');
module.exports = function (gulp, plugins) {
    return function () {
      gulp.src('./dev/pug/*.pug')
        .pipe(plugins.plumber())
        .pipe(plugins.data(function(file) {
          return JSON.parse(fs.readFileSync('./dev/db/db.json'))
        }))
        .pipe(plugins.pug({
          pretty: true
        }))
        .pipe(gulp.dest('./public'))
        .pipe(plugins.browserSync.reload({ stream: true }));
    }
  }
