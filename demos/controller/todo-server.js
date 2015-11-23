import state from '../script/state-todo-server';
var subscriptions = [];
export const send = action => state(action)
  .then(data =>subscriptions.forEach(subscription => subscription(data)));
export const subscribe = callback => {
  subscriptions.push(callback);
};
