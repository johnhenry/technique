import getUpdate from '../script/get-update';
import {getState, setState} from '../script/state-todo';
export const subscriptions = [];
export const send = action => getState()
  .then(state => getUpdate(action || {type: 'reset'})
    .then(update => setState(update(state))
      .then(data => subscriptions.forEach(subscription => subscription(data)))));
