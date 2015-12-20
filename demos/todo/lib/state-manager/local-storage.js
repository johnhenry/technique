//import localStorage from '../window/localStorage';
export default (initialState) => {
  const key = 'key';
  localStorage.setItem(key, JSON.stringify(initialState));
  return {
    __proto__ : undefined,
    get : (context) => Promise.resolve(JSON.parse(localStorage.getItem(key))),
    set : (newState, context) => {localStorage.setItem(key, JSON.stringify(newState)); return Promise.resolve(newState)}
  }
}
