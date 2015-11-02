var postMatch = new RegExp('/post/(.*).html');
var indexMatch = new RegExp('/(.*).html');
export default function * requestType(next){
    if(postMatch.test(this.request.path)){
      this.pageType = 'post';
      this.slug = postMatch.exec(this.request.path)[1];
      yield next;
    }else if(indexMatch.test(this.request.path)){
      this.pageType = 'index';
      this.index = Number(indexMatch.exec(this.request.path)[1]);
      yield next;
    }else if(this.request.path === '/' || this.request.path === '/index.html'){
      this.pageType = 'index';
      this.index = 0;
      yield next;
    };
};
