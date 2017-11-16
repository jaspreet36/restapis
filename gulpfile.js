var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint');

gulp.task('style', function() {
    gulp.src(['*.js'])
    .pipe(jshint());
    // .pipe(jshint.reporter('jshint-stylish', {
    //     verbose: true
    // }));
});

gulp.task('default', ['style'], function() {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function() {
        console.log('Restarting');
    });
});