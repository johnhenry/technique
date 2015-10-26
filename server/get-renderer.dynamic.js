import indexRenderer from './renderers/index-page';
import postRenderer from './renderers/post-page';
var getRenderer = context => {
  if(context.pageType === 'index')
  return Promise.resolve(indexRenderer(context));
  if(context.pageType === 'post')
  return Promise.resolve(postRenderer(context));
};
export default getRenderer;
