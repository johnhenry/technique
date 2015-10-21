import {render, subscribe} from './renderer';
var subscription = action => {
  return fetch('/', {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: action ? JSON.stringify(action) : action
    })
    .then(response => response.json())
    .then(render);
};
subscribe(subscription);
var init = () => subscription();
export default init;
