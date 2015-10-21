/*
schema:
  state:
  {
    name: String,
    todos: List<String>
  }
*/

var state;
var getState = context => Promise.resolve(state);
var setState = newState => Promise.resolve(state = newState);
export default {getState, setState};
