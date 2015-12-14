import path from 'path';
import getBlogData from './get-blog-data';
import {BLOG} from '../settings.js';

export default context => getBlogData(path.resolve(__dirname, BLOG.DATA))
.then(posts => {
  if(BLOG.REVERSE) posts = posts.reverse();
  if(context.pageType === 'index'){
    const index = context.index === 0 ? 0 : context.index - 1;
    const start = index * BLOG.ITEMSPERINDEXPAGE;
    const end   = index * BLOG.ITEMSPERINDEXPAGE + BLOG.ITEMSPERINDEXPAGE;
    const selectedPosts = posts.slice(start, end);
    return Promise.resolve({
              index : index,
              posts : selectedPosts,
              last  : start >= posts.length - BLOG.ITEMSPERINDEXPAGE
      });
  }
  if(context.pageType === 'post'){
    var index = 0;
    var post;
    for(post of posts) {
      if(post.slug === context.slug) break;
      index++;
    }
    if(post.slug !== context.slug) return Promise.reject(new Error(`Slug '${context.slug}' not found.`));
    return Promise.resolve({
                  index : index
                  ,post : posts[index]
                  ,prev : posts[index - 1]
                  ,next : posts[index + 1]
                });
  }
});
