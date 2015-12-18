/**
Return renderer function based on context
@param context:Object
@return Promise<*=>*>
*/
import rendererDictionary from './renderer-dictionary';
export default context => Promise.resolve(rendererDictionary['json'](context));
