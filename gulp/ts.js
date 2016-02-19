'use strict';

var gulp = require('gulp');

var tsc = require('typescript');
var typescript = require('gulp-typescript');
//var runSequence = require('run-sequence');

gulp.task('ts-build-app', () => gulp.src([
    'typings/tsd.d.ts',
    'own_typings/**/*.d.ts',
    'todo-lib/own_typings/**/*.d.ts',
    'src/**/*.{ts,tsx}',
    'node_modules/reflect-metadata/reflect-metadata.d.ts'
]).pipe(typescript({
    jsx: 'react',
    target: 'ES5',
    module: 'system',
    moduleResolution: 'node',
    sourceMap: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    removeComments: false,
    noImplicitAny: false,
    typescript: tsc
})).js.pipe(gulp.dest('dist/app/')));

gulp.task('ts-build-lib', () => gulp.src([
    'typings/tsd.d.ts',
    'own_typings/**/*.d.ts',
    'todo-lib/**/*.{ts,tsx}',
    'node_modules/reflect-metadata/reflect-metadata.d.ts'
]).pipe(typescript({
    jsx: 'react',
    target: 'ES5',
    module: 'system',
    moduleResolution: 'node',
    sourceMap: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    removeComments: false,
    noImplicitAny: false,
    typescript: tsc
})).js.pipe(gulp.dest('dist/todo-lib/')));

//gulp.task('ts', (done) => {
//    runSequence('ts-lint', 'ts-build', done);
//});

gulp.task('ts-build', ['ts-build-app', 'ts-build-lib']);