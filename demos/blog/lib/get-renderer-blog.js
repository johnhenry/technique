import indexRenderer from '../renderer/server-response/index-page';
import postRenderer from '../renderer/server-response/post-page';
/**
  @description Get renderer based on type of page requested
  @param {object} contex
  @returns {promise<array<string>>}
 */
export default context => {
  if(context.pageType === 'index')
  return Promise.resolve(indexRenderer(context));
  if(context.pageType === 'post')
  return Promise.resolve(postRenderer(context));
};
