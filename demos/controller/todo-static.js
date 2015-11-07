import getUpdate from '../script/get-update';
import {getState, setState} from '../script/state-todo';
import {render, subscribe} from '../renderer/dom/todo-static';
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
