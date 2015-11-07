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

const BASESTATE = {
  name: 'Todo List'
  ,todos: []
};
var cloneState = state => {return JSON.parse(JSON.stringify(state))};
var actionDictionary = {
  __proto__ : null
  ,'update-name': name => state => {
    var newState = cloneState(state);
    newState.name = name;
    return newState;
  }
  ,'add-todo' : todo => state => {
    var newState = cloneState(state);
    newState.todos.push(todo);
    return newState;
  }
  ,'reset': () => () => cloneState(BASESTATE)

};
export default actionDictionary;
