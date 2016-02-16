'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');

//var extend = require('extend');
//var proxy = require('proxy-middleware');
//var url = require('url');

//var apiHost = 'dev.globality.com';
//var apiUrl = 'http://' + apiHost;
//var apiPrefix = '/api/v1';
//
//var middleware = [
//    '/auth',
//    '/chatroom',
//    '/company',
//    '/contract',
//    '/file',
//    '/milestone',
//    '/payments',
//    '/project',
//    '/proposal',
//    '/user',
//    '/qna_session'
//].map(function (path) {
//    return proxy(extend(url.parse(apiUrl + apiPrefix + path), {
//        route: apiPrefix + path
//    }));
//});

gulp.task('serve', () => gulp.src('./').pipe(webserver({open: true, livereload: true})));
