var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');

/**
* Task for clean distribution directory
*/
var clean = require('gulp-rimraf');

gulp.task('clear', function() {
    return gulp.src(['../dist/**/*.js'], { read: false })
           .pipe(clean({ force: true }));
});

/**
* Task for compress images
*/
var imagemin = require('gulp-imagemin');
gulp.task('images', ['clear'], function () {
    return gulp.src(['public/images/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
});


/**
* Task for compress css style sheets
*/
gulp.task('minify-css', ['imagens'], function () {
    gulp.src('public/scripts/*.js')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

/**
* Task for compress javascript files
*/
gulp.task('scripts', ['clear'], function() {
    return gulp.src('public/scripts/*.js')
      .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

/**
* Task running by default
*/
gulp.task('default', ['scripts', 'minify-css']);