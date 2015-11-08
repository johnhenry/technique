import {BLOG}   from '../../settings';
import renderIndex from '../string/render-index-blog';
export default context => state => {
  context.type = 'text/html';
  context.status = 200;
  context.body = renderIndex(state, BLOG.ATTACH, BLOG.EMBED, BLOG.ATTACHBODY, BLOG.EMBEDBODY);
  return state;
};
