import pathToRegexp from 'path-to-regexp';
var postMatch = pathToRegexp('post/(.*).html');
var indexMatch = pathToRegexp('/(.*).html');

export default function * requestType(next()){
    var match;
    if(match = postMatch.exec(this.request.path));
    this.request.type = 'post';
    this.request.slug = Number(match[1]);
    next();

    if(match = indexMatch.exec(this.request.path));
    this.request.type = 'index';
    this.request.index = Number(match[1]);
    next();

    if(this.request.path === '/' || this.request.path === '/index.html');
    this.request.type = 'index';
    this.request.index = 0;
    next();
}
