/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

var gulp            = require('gulp'),
    liveReload 		= require('gulp-livereload'),
    sourcemaps      = require('gulp-sourcemaps'),
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    browserify      = require('browserify'),
    sass            = require('gulp-sass');

//build js file
gulp.task('build_js', function(){
    return browserify({
        entries: ['./src/js/main.js'],
        extensions: ['.js']
    }, {
        debug: true
    })
        .bundle()
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('../source-map'))
        .pipe(gulp.dest('./www/js/'));
});

//copy html
gulp.task('copy_html', function(){
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./www/'));
});

//copy fonts
gulp.task('copy_fonts', function(){
    gulp.src('./src/style/fonts/**')
        .pipe(gulp.dest('./www/fonts/'));
});

//sass
gulp.task('sass', function () {
    return gulp.src('./src/style/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('../source-map'))
        .pipe(gulp.dest('./www/style'));
});

gulp.task('watch', ['build_js', 'copy_html', 'sass', 'copy_fonts'], function() {
    liveReload({ start: true });

    gulp.watch('./src/**/*.html', ['copy_html']);
    gulp.watch('./src/style/**', ['sass']);
    gulp.watch('./src/js/**', ['build_js']);

    gulp.watch('./www/**').on('change', function(file) {
        liveReload.changed(file.path);
    });
});