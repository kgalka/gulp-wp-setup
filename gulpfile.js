'use strict';

// Set your custom theme name
var themeName = 'theme';

	var gulp = require('gulp'),
	  concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
autoprefixer = require('gulp-autoprefixer'),
		sass = require('gulp-sass'),
		maps = require('gulp-sourcemaps'),
	   clean = require('gulp-clean');

gulp.task('copyFiles', function() {
	gulp.src('src/templates/**/*')
		.pipe(gulp.dest(themeName + '/'));
	gulp.src('src/images/**/*')
		.pipe(gulp.dest(themeName + '/'));	
	gulp.src('src/fonts/**/*')
		.pipe(gulp.dest(themeName + '/'));		
});

gulp.task('concatScripts', function() {
	return gulp.src('src/js/main.js')
		// .pipe(maps.init())
		.pipe(concat('main.js'))
		// .pipe(maps.write('./'))
		.pipe(gulp.dest('theme/js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
	return gulp.src('src/js/main.js')
		// .pipe(maps.init())
		// .pipe(uglify())
		// .pipe(maps.write('./'))
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest(themeName + '/js'));
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
		.pipe(gulp.dest(themeName + '/css'))
});

gulp.task('watchFiles', function() {
	gulp.watch('src/templates/**/*', ['build']);
	gulp.watch('src/sass/**/*', ['build']);
	gulp.watch('src/js/main.js', ['build']);
});

gulp.task('clean', function() {
	gulp.src([themeName, 'wordpress/wp-content/themes/' + themeName])
		.pipe(clean({force : true}));
});

gulp.task('build', ['copyFiles', 'minifyScripts', 'compileSass'], function(){
	return gulp.src(['/css/main.min.*', '/js/main.min.*'], { base: themeName})
		.pipe(gulp.dest(themeName))
});

gulp.task('wp-theme', ['build'], function () {
	gulp.src(themeName + '/**/*')
		.pipe(gulp.dest('wordpress/wp-content/themes/' + themeName + '/'));	
});

gulp.task('default', ['wp-theme', 'watchFiles'], function() {
	gulp.start('build');

});



