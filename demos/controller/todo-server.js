import update from '../script/state-todo-server';
export const subscriptions = [];
export const send = action => update(action)
  .then(data => subscriptions.forEach(subscription => subscription(data)));
