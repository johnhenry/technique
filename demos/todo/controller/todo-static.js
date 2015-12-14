import getUpdate from '../lib/get-update';
import {getState, setState} from '../lib/state-todo';
export const subscriptions = [];
export const send = action => getState()
  .then(state => getUpdate(action || {type: 'reset'})
    .then(update => setState(update(state))
      .then(data => subscriptions.forEach(subscription => subscription(data)))));
