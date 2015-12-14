import jsonRenderer from '../renderer/server-response/json';
var getRenderer = context=>Promise.resolve(jsonRenderer(context));
/**
Return renderer from selection of renderers
@param context:Object
@return Promise<*=>*>
*/
export default getRenderer;
