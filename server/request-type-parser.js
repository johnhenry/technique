import pathToRegexp from 'path-to-regexp';
var postMatch = pathToRegexp('/post/(.*).html');
var indexMatch = pathToRegexp('/(.*).html');

export default function * requestType(next){
    var match;
    if(match = postMatch.exec(this.request.path)){
      this.pageType = 'post';
      this.slug = match[1];
      yield next;
    }else if(match = indexMatch.exec(this.request.path)){
      this.pageType = 'index';
      this.index = Number(match[1]);
      yield next;
    }else if(this.request.path === '/' || this.request.path === '/index.html'){
      this.pageType = 'index';
      this.index = 0;
      yield next;
    };

}
