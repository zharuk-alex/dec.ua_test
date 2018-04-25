const autoprefixer = require('gulp-autoprefixer');
const browserify = require('gulp-browserify');
const browserSync = require('browser-sync');
const buffer = require('vinyl-buffer');
const cache = require('gulp-cache');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const cssnano = require('gulp-cssnano');
const data = require('gulp-data');
const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const jpegtran = require('imagemin-jpegtran');
const jsoncombine = require('gulp-jsoncombine');
const jsonConcat = require('gulp-json-concat');
const log = require('gulplog');
const merge = require('gulp-merge-json');
const notify = require("gulp-notify");
const path = require('path');
const plumber = require('gulp-plumber');
const pngquant = require('imagemin-pngquant');
const pug = require('gulp-pug');
const reload = browserSync.reload;
const sass = require('gulp-sass');
const sassImportJson = require('gulp-sass-import-json');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const uncss = require('gulp-uncss');

const plugins = require('gulp-load-plugins')({pattern: '*'});



function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}

gulp.task('browser-sync', getTask('browser-sync'));
gulp.task('clean-data', getTask('clean-data'));
gulp.task('clean-html', getTask('clean-html'));
gulp.task('scripts', getTask('scripts'));
gulp.task('sass', getTask('sass'));
gulp.task('template', ['pug', 'pug:data'], getTask('pug'));
gulp.task('pug:data', getTask('pug-data'));
gulp.task('pug', ['pug:data'], getTask('pug'));
gulp.task('images', getTask('images'));
gulp.task('libs', getTask('libs'));

gulp.task('watch', ['browser-sync', 'sass', 'scripts', 'images', 'libs', 'pug:data', 'pug' ], function() {
	gulp.watch('dev/scss/**/*.scss', ['sass']);
	gulp.watch('dev/js/**/*.js', ['scripts']);
	gulp.watch('dev/images/**/*', ['images']);
	gulp.watch(['dev/data/**/*.json', 'dev/pug/**/*.pug'], ['pug:data', 'pug'], browserSync.reload);
});

gulp.task('default', ['watch']);
