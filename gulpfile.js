"use strict";

var gulp = require('gulp');
var scp2 = require('gulp-scp2');
var sequence = require('run-sequence');

gulp.task('dev', function(){
    return gulp.src('dist/**')
        .pipe(scp2({
            host: '39.106.174.178',
            username: 'root',
            password: 'Nbahainm0932',
            dest: '/usr/local/tomcat/apache-tomcat-8.5.23-1/webapps/wx/dist'
        }))
        .on('error', function(err) {
            throw err;
        });
});

gulp.task('default', function(done){
    sequence(
        'dev',
        done
    )
});
