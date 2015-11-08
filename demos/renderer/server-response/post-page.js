import {BLOG}   from '../../settings';
import renderPost from '../string/render-post-blog';
export default context => state => {
  context.type = 'text/html';
  context.status = 200;
  context.body = renderPost(state, BLOG.ATTACH, BLOG.EMBED, BLOG.ATTACHBODY, BLOG.EMBEDBODY);
  return state;
};
