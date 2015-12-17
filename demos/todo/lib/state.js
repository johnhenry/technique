/*
schema:
  state:
  {
    name: String,
    todos: List<String>
  }
*/
export default (BASESTATE) => {
  var internalstate = BASESTATE;
  return {
    get : () => Promise.resolve(internalstate),
    set : newState => Promise.resolve(internalstate = newState)
  }
}
