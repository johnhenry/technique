/*
schema:
  instruction:
  {
    type: Strut ['update-name', 'add-todo'],
    payload: *
  }
    instruction(type='add-todo'):
    {
      payload: String
    }
    instruction(type='update-name'):
    {
      payload: String
    }
    instruction(type='reset'):
    {

    }
*/
import clone from './clone';
import BASESTATE from './BASESTATE';
export default {
  __proto__ : null
  ,'update-name': name => state => {
    const newState = clone(state);
    newState.name = name;
    return newState;
  }
  ,'add-todo' : todo => state => {
    const newState = clone(state);
    newState.todos.push(todo);
    return newState;
  }
  ,'clear-todos' : todo => state => {
    const newState = clone(state);
    newState.todos = [];
    return newState;
  }
  ,'reset': () => () => BASESTATE
  ,'no-update': () => state => state
};
