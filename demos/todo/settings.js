export const SERVER = {
  PORT      : process.env.PORT || 3000,
  STATICDIR : '../../www'
};
export const BASESTATE = {
  name: 'Todo List',
  todos: []
};
export const INITIALINSTRUCTION = {
  type:'no-update'
}
/*
schema:
  state:
  {
    name: String,
    todos: List<String>
  }
  instruction:
  {
    type:String,
    payload?:*
  }
*/
