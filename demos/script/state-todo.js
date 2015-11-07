/*
schema:
  state:
  {
    name: String,
    todos: List<String>
  }
*/

var state;
export const getState = context => Promise.resolve(state);
export const setState = newState => Promise.resolve(state = newState);
