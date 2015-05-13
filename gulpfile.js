'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var entry = 'index.js';
var src = [ entry, 'src/**/*.js' ];
var srcOption = { base: './' };
var dest = './dist';


gulp.task('clean', function () {
    return gulp.src(dest, {read: false})
        .pipe(clean())
        .pipe(gulp.dest(dest));
});

gulp.task('html', function () {
    return gulp.src(['index.html', 'example.html'], srcOption)
        .pipe(gulp.dest(dest));
});


gulp.task('babel-node', function () {
    return gulp.src(src, srcOption)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))
        .pipe(gulp.dest(dest));
});

gulp.task('babel-browser', function () {
    return gulp.src(entry, srcOption)
        .pipe(sourcemaps.init())
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production,
            transform: ['babelify']
        }))
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))
        .pipe(gulp.dest(dest));
});

gulp.task('node', function () {
    runSequence('clean', 'babel-node');
});
gulp.task('browser', function () {
    runSequence('clean', 'babel-browser', 'html');
});