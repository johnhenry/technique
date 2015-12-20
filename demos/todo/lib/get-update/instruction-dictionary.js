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
  ,'set' : newState => state => {
    return newState;
  }
  ,'no-update': () => state => state
};
