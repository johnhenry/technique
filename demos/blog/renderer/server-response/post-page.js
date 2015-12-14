import {BLOG}   from '../../settings';
import renderPost from '../string/render-post-blog';
/**
  @description ???
  @param {object} : context Request context
  @returns @function
    @description Generate HTML response for index page (side effect)
    @param {object} state
    @return {undefined}
 */
export default context => state => {
  context.type = 'text/html';
  context.status = 200;
  context.body = renderPost(state, BLOG.ATTACH, BLOG.EMBED, BLOG.ATTACHBODY, BLOG.EMBEDBODY);
  return state;
};
