import jsonRenderer from '../renderer/server-response/json';
var getRenderer = context=>Promise.resolve(jsonRenderer(context));
export default getRenderer;
