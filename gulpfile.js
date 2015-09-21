var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var javascriptsAll = ['header.js',
                      'data/alphabet.js',
                      'ciphers/caesar.js',
                      'ciphers/vigenere.js'];

var javascriptsBrowser = ['browser.js',
                          'ui/toolbar.js',
                          'ui/pages.js',
                          'ui/caesar-dom.js'];

gulp.task('html', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('scss', function() {
    gulp.src('src/scss/main.scss')
        .pipe(sass({outputStyle: "expanded"}))
        .pipe(gulp.dest('other/css'))
        .pipe(autoprefixer({browsers: ['last 2 version']}))
        .pipe(rename('main-prefixed.css'))
        .pipe(gulp.dest('other/css'))
        .pipe(minifycss())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('js-browser', function() {
    var finalJs = [];
    function getListOfBrowserJs() {
        var concatList = javascriptsAll.concat(javascriptsBrowser);
        concatList.forEach(function(content) {
            finalJs.push('src/js/' + content); // prefix every path with src/js
        });
    }
    getListOfBrowserJs();
    
    gulp.src(finalJs)
        .pipe(concat('crypto-toolkit.js'))
        .pipe(gulp.dest('other/js/'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('browser', ['html', 'scss', 'js-browser'], function() {
});

gulp.task('watch-browser', function() {
    var htmlwatcher = gulp.watch('src/index.html', ['html']);
    htmlwatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    
    var scsswatcher = gulp.watch('src/scss/main.scss', ['scss']);
    scsswatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    
    var jswatcher = gulp.watch('src/js/**/*.js', ['js-browser']);
    jswatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
