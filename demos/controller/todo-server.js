import state from '../script/state-todo-server';
export var subscriptions = [];
export const send = action => state(action)
  .then(data =>subscriptions.forEach(subscription => subscription(data)));
