var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
 
gulp.task('default', function () {
  return gulp.src('./public/hw5/css/*.css')
    .pipe(concatCss("index.css"))
    .pipe(gulp.dest('./public/hw5/'));
});