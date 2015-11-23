import path from 'path';
import getBlogData from './get-blog-data';
import {BLOG} from '../settings.js';
var getBlogState = function(context){
  return getBlogData(path.resolve(__dirname, '../data'))
  .then(posts => {
    if(BLOG.REVERSE) posts = posts.reverse();
    if(context.pageType === 'index'){
      return Promise.resolve({
                index : context.index,
                posts : posts.slice(
                  context.index,
                  context.index + BLOG.ITEMSPERINDEXPAGE),
                last : (context.index >= posts.length - BLOG.ITEMSPERINDEXPAGE)
        });
    }
    if(context.pageType === 'post'){
      var index = 0;
      var post;
      for(post of posts) {
        if(post.slug === context.slug) break;
        index++;
      }
      return Promise.resolve({
                    index : index
                    ,post : posts[index]
                    ,prev : posts[index - 1]
                    ,next : posts[index + 1]
                  });
    }
  })
}
export default getBlogState;
