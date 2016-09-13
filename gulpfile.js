var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var sync = require('gulp-config-sync');

gulp.task('header', function () {

    var today = new Date().toLocaleDateString();

    // using data from package.json 
    var pkg = require('./package.json');
    var banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>\n',
        ' * @version    : <%= pkg.version %>',
        ' * @author     : <%= pkg.author %>\n' +
        ' * @license    : <%= pkg.license %>',
        ' * @repository : <%= pkg.repository.url %>',
        ' * @built      : <%= today %>',
        ' */',
    ''].join('\n');

    gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(header(banner, { pkg : pkg, today: today } ))
    .pipe(rename("jslinq.min.js"))    
    .pipe(gulp.dest('./build'))
    .on('end', function(){ 
        console.log("Gulp 'header' task completed!"); 
    });
});

//Sync bower with package 
gulp.task('sync', function() {
  gulp.src(['bower.json'])
    .pipe(sync())
    .pipe(gulp.dest('.'))
    .on('end', function(){ 
        console.log("Gulp 'sync' task completed!"); 
    });
});

gulp.task('build', ['sync', 'header'], function(){
    console.log("Gulp 'build' task completed!");
});