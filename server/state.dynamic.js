/*
schema:
  blog-state:
  {
    name: String,
    todos: List<String>
  }
*/
import path from 'path';
import getBlogData from '../_blog/build/get-blog-data';
import {BLOG} from '../settings.js';
var input = path.resolve(__dirname, '../_blog/build/data');
var getBlogState = function(context){
  return getBlogData(input)
  .then(posts => {
    if(BLOG.REVERSE) posts = posts.reverse();
    if(context.pageType === 'index'){
      var index = context.index;
      var length = posts.length;
      var size = BLOG.ITEMSPERINDEXPAGE;
      var postArray = posts.slice(index, index + size);
      var state = {
                index : index,
                posts : postArray,
                last : (index >= length - size)
        };
      return Promise.resolve(state);
    }
    if(context.pageType === 'post'){
      var post;
      var index = 0;
      for(post of posts) {
        if(post.slug === context.slug) break;
        index++;
      }
      var state = {
                    index : index
                    ,post : post
                    ,prev : posts[index - 1]
                    ,next : posts[index + 1]
                  };
      return Promise.resolve(state);
    }
  })
}
export default getBlogState;
