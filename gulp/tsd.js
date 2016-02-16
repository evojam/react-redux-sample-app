'use strict';

const gulp = require('gulp');
const tsd = require('gulp-tsd');

gulp.task('tsd', done => tsd({command: 'reinstall', config: 'tsd.json'}, done));
