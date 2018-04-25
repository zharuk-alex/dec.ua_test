const merge = require('gulp-merge-json');
const path = require('path');
module.exports = function (gulp, plugins) {
  return function () {
    gulp.src('./dev/data/**/*.json')
      .pipe(plugins.plumber())
      .pipe(merge({
        fileName: 'data.json',
        exportModule: true,
        edit: (json, file) => {
          // Extract the filename and strip the extension
          var filename = path.basename(file.path),
              primaryKey = filename.replace(path.extname(filename), '');

          // Set the filename as the primary key for our JSON data
          var data = {};
          data[primaryKey] = json;

          return data;
        }
      }))
      .pipe(gulp.dest('./dev'));
  }
}
