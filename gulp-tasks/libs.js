var libs = {
  jquery: {
    js: 'node_modules/jquery/dist/jquery.js'
  },
  inputmask: {
    js: "node_modules/inputmask/dist/jquery.inputmask.bundle.js"
  },
  validate: {
    js: 'node_modules/jquery-validation/dist/jquery.validate.js'
  },
  validate_add: {
    js: 'node_modules/jquery-validation/dist/additional-methods.js'
  },
  'validate-message': {
    js: 'node_modules/jquery-validation/dist/localization/messages_ru.js'
  }
};

var js_libs = Object.keys(libs).map(function(key, index) {
  return (libs[key].hasOwnProperty('js'))?libs[key].js:'';
},[]).concat(['dev/libs/js/**/*.js']);

var css_libs = Object.keys(libs).map(function(key, index) {
  return (libs[key].hasOwnProperty('css'))?libs[key].css:'';
},[]).concat(['dev/libs/css/**/*.css']);

module.exports = function(gulp, plugins) {
  return function() {
    gulp.src(css_libs)
      .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError("Error: <%= error.message %>")
      }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('bundle-libs.css'))
      .pipe(plugins.cssnano())
      .pipe(plugins.rename({suffix: '.min'}))
      .pipe(gulp.dest('public/libs/'))
      .pipe(plugins.browserSync.reload({ stream: true }));

    gulp.src(js_libs)
      .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError("Error: <%= error.message %>")
      }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.uglify())
      .pipe(plugins.concat('bundle-libs.min.js'))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest('public/libs/'))
      .pipe(plugins.browserSync.reload({ stream: true }));
  }
}
