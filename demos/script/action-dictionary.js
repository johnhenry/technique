/*
schema:
  action:
  {
    type: Strut ['update-name', 'add-todo'],
    payload: *
  }
    action(type='add-todo'):
    {
      payload: String
    }
    action(type='update-name'):
    {
      payload: String
    }
    action(type='reset'):
    {

    }
*/
import clone from './clone';
const BASESTATE = {
  name: 'Todo List'
  ,todos: []
};
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
  ,'reset': () => () => clone(BASESTATE)

};
