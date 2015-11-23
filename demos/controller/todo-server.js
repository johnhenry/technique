import update from '../script/state-todo-server';
export var subscriptions = [];
export const send = action => update(action)
  .then(data => subscriptions.forEach(subscription => subscription(data)));
