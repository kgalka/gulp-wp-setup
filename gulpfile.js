var THEME_NAME = 'theme';

var THEME_DIR = 'wordpress/wp-content/themes/' + THEME_NAME;

'use strict';

	var gulp = require('gulp'),
	  concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
autoprefixer = require('gulp-autoprefixer'),
		sass = require('gulp-sass'),
		maps = require('gulp-sourcemaps'),
	 include = require('gulp-include'),
	   clean = require('gulp-clean');



gulp.task('copyFiles', function() {
	gulp.src('src/templates/**/*')
		.pipe(gulp.dest(THEME_DIR + '/'));
	gulp.src('src/images/**/*')
		.pipe(gulp.dest(THEME_DIR + '/images'));	
	gulp.src('src/media/**/*')
		.pipe(gulp.dest(THEME_DIR + '/media'));		
	gulp.src('src/fonts/**/*')
		.pipe(gulp.dest(THEME_DIR + '/fonts'));		
});

gulp.task('concatScripts', function() {
	return gulp.src('src/js/main.js')
		// .pipe(maps.init())
		.pipe(concat('main.js'))
		// .pipe(maps.write('./'))
		.pipe(gulp.dest(THEME_DIR + '/js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
	return gulp.src('src/js/main.js')
		// .pipe(maps.init())
		.pipe(include())
		// .pipe(uglify())
		// .pipe(maps.write('./'))
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest(THEME_DIR + '/js'));
});

gulp.task('compileSass', function() {
	return gulp.src('src/sass/main.scss')
		.pipe(maps.init())
		.pipe(sass(
			// { outputStyle: 'compressed' }
		).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(rename('main.min.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(THEME_DIR + '/css'))
});

gulp.task('watch', function() {
	gulp.watch('src/templates/**/*', ['copyFiles']);
	gulp.watch('src/sass/**/*', ['compileSass']);
	gulp.watch('src/js/main.js', ['minifyScripts']);
});

gulp.task('clean', function() {
	gulp.src([THEME_DIR])
		.pipe(clean({force : true}));
});

gulp.task('default', ['copyFiles', 'minifyScripts', 'compileSass', 'watch'], function() {

});



