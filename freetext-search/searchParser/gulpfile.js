var gulp = require('gulp');
var shell = require('gulp-shell')


gulp.task('specs', shell.task([
    'jasmine-node specs'
]));

gulp.task('debug', shell.task([
    'node-debug main.js'
]));

gulp.task('debug_s', shell.task([
    'node-debug --debug-brk node_modules/jasmine-node/lib/jasmine-node/cli.js specs'
]));

gulp.task('default', ['specs']);