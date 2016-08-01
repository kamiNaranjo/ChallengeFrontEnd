var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');

/**
* Task for clean distribution directory
*/
var clean = require('gulp-rimraf');

gulp.task('clear-images', function() {
    return gulp.src(['/dist/images/*.*'], { read: false })
           .pipe(clean({ force: true }));
});

gulp.task('clear-scripts', function() {
    return gulp.src(['/dist/scripts/*.js'], { read: false })
           .pipe(clean({ force: true }));
});

gulp.task('clear-css', function() {
    return gulp.src(['/dist/styles/*.css'], { read: false })
           .pipe(clean({ force: true }));
});

gulp.task('clear-html', function() {
    return gulp.src(['/dist/*.html'], { read: false })
           .pipe(clean({ force: true }));
});

gulp.task('clear',['clear-images','clear-css', 'clear-scripts', 'clear-html'], function() {
    console.log("Finished clear task.");	
});

/**
* Task for minimize images
*/
var imagemin = require('gulp-imagemin');
gulp.task('minify-images', ['clear-images'], function () {
    return gulp.src(['public/images/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
});

/**
* Task for minimize html
*/
var htmlmin = require('gulp-htmlmin');

gulp.task('minify-html',['clear-html'], function() {
  return gulp.src('public/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

/**
* Task for minimize css style sheets
*/
gulp.task('minify-css', ['clear-css'], function () {
    gulp.src('public/styles/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/styles'));
});

/**
* Task for minimize javascript files
*/
gulp.task('minify-scripts', ['clear-scripts'], function() {
    return gulp.src('public/scripts/*.js')
      .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

/**
* Task for watching files
*/
gulp.task('deployApp',['start'], function() {
  gulp.watch('public/script/*.js', ['minify-scripts']);
  gulp.watch('public/style/*.css', ['minify-css']);
  gulp.watch('public/images/**/*', ['minify-images']);
  gulp.watch('public/*.html', ['minify-html']);
 });
 
/**
* Task for start node js server 
*/

var nodemon = require('gulp-nodemon');

gulp.task('start', ['minify-scripts', 'minify-css', 'minify-images', 'minify-html'], function (cb) {
	var started = false;
	return nodemon({
		script: './bin/www',
		ext: 'js',
		env: {
			'NODE_ENV': 'challenge'
		}
	})
});

/**
* Task running by default
*/
gulp.task('default', ['deployApp']);