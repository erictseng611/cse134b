var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
 
gulp.task('default', function () {
  return gulp.src('./public/hw3partb/css/*.css')
    .pipe(concatCss("index.css"))
    .pipe(gulp.dest('./public/hw3partb/'));
});