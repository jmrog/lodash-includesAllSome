var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    mocha = require('gulp-mocha');

var sourceglob = './src/*.js',
    testglob = './test/*.js',
    dist = './dist/',
    renameOptions = { suffix: '.min' };

// check with jshint, then copy and minify
gulp.task('build', function() {
    return gulp.src(sourceglob)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest(dist)) // un-minified
        .pipe(streamify(uglify()))
        .pipe(rename(renameOptions))
        .pipe(gulp.dest(dist));
});

gulp.task('test', function() {
    return gulp.src(testglob)
        .pipe(mocha());
})

// re-run tests on changes to source or tests
gulp.task('watch', function() {
    gulp.watch([sourceglob, testglob], ['test']);
});

gulp.task('default', ['watch']);
