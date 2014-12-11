var gulp = require('gulp');
var shell = require('gulp-shell')


gulp.task('specs', shell.task([
  'jasmine-node specs'
]));

gulp.task('debug', shell.task([
  'node-debug main.js'
]));

gulp.task('default', ['specs']);


