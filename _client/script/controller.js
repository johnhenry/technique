import getUpdate from './get-update';
import {getState, setState} from './state';
import {render, subscribe} from './renderer';
var subscription = action => {
  return getState().then(state=>{
    getUpdate(action).then(update=>{
      setState(update(state)).then(render)
    });
  });
};
subscribe(subscription);
var init = () => subscription({type: 'reset'});
export default init;
