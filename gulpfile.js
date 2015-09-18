var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('scss', function() {
    gulp.src('src/scss/main.scss')
        .pipe(sass({outputStyle: "extended"}))
        .pipe(autoprefixer({browsers: ['last 2 version']}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('browser', ['html', 'scss'], function() {
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
});