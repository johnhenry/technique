import window from './window';
const fetch = window.fetch;
export default action => fetch('/', {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body: action ? JSON.stringify(action) : ''
  })
  .then(response => response.json())
