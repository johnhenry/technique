import actionDictionary from './action-dictionary';
var getUpdate = action => Promise.resolve(actionDictionary[action.type](action.payload));
export default getUpdate;
