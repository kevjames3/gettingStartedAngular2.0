"use strict"
const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject("src/tsconfig.json");
const path = require('path');
const gutil = require('gulp-util');

const extensionsToCopyOver = [
    "*.html",
    "*.js",
    "*.ico",
    "*.css"
];
const src = "src";
const dest = "dest";

gulp.task('default', [
    'typeScript',
    'copy'
]);

gulp.task('watch', ['default'], function() {
    gulp.watch('src/**/*', ['default']);
});

gulp.task("typeScript", function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())

    return tsResult.js
        .pipe(sourcemaps.write('.', {
           sourceRoot: function(file){ 
               return file.cwd + '/src'; }
            }
        ))
        .pipe(gulp.dest('dest'));
});

gulp.task('copy', function(){
    extensionsToCopyOver.forEach((ext) => {
       gutil.log(`== Copying over ${ext} ==`);
       gulp.src(`${src}/**/${ext}`)
        .pipe(gulp.dest(dest)); 
    });
});