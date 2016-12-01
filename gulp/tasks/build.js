var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var del = require('del');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browsersync = require('browser-sync').create();


gulp.task('previewDist', function() {
       browsersync.init({
       notify: false,
       server: {
          baseDir: "dist"
       }
   });
});

gulp.task('deleteDistFolder', function(){
	return del("./dist");
});

gulp.task('optimizeImages', ['deleteDistFolder'], function(){
	return gulp.src(['./app/assets/images/**/*'])
	.pipe(imagemin({
		progressive: true,
		interlaced: true,
		multipass: true
	}))
	.pipe(gulp.dest("./dist/assets/images"));
});


gulp.task('usemin', ['deleteDistFolder'], function(){
    return gulp.src("./app/index.html")
    .pipe(usemin({
    	css: [function(){return rev()}, function() {return cssnano()}],
    	js: [function(){return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest("./dist"));
});


gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'usemin']);