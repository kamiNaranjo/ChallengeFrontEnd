var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

gulp.task('scripts', function() {
    return gulp.src('public/scripts/*.js')
      .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
  return gulp.src('public/styles/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});

 // Default Task
gulp.task('default', ['scripts', 'minify-css']);