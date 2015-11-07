import indexRenderer from '../renderer/server-response/index-page';
import postRenderer from '../renderer/server-response/post-page';
var getRenderer = context => {
  if(context.pageType === 'index')
  return Promise.resolve(indexRenderer(context));
  if(context.pageType === 'post')
  return Promise.resolve(postRenderer(context));
};
export default getRenderer;
