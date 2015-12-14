import actionDictionary from './action-dictionary';
/**
Return renderer from
@param context:Object
@return Promise< action => * => state => state >
*/
export default action => Promise.resolve(actionDictionary[action.type](action.payload));
