import getUpdate from '../script/get-update';
import {getState, setState} from '../script/state-todo';
export var subscriptions = [];
export const send = action => {
  return getState()
  .then(state=>getUpdate(action)
    .then(update=>setState(update(state))
      .then(data =>subscriptions.forEach(subscription => subscription(data)))));
};
