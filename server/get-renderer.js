import jsonRenderer from './renderers/json';
var getRenderer = context=>Promise.resolve(jsonRenderer(context));
export default getRenderer;
