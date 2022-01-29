var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(gulp.dest('./dist/styles/'));
});
gulp.task('scripts', function () {
  return gulp.src('./src/scripts/**/*.js')
  .pipe(gulp.dest('./dist/scripts/'));
});
gulp.task('sass:watch', function () {
  gulp.watch('./src/styles/*.scss', gulp.series('sass'));
  gulp.watch('./src/scripts/**/*.js', gulp.series('scripts'));
});