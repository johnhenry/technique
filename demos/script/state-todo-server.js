import fetch from './window/fetch';
import JSON from './window/JSON';
export default action => fetch('/', {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body: action ? JSON.stringify(action) : ''
  })
  .then(response => response.json())
