var React = require('react');
var TodoList = ({todos, className}) => {
    var i=0;
    todos = (todos || []).map(todo => {
      return <li key={i++}>{todo}</li>;
    });
    return <ul className={className}>
          {todos}
        </ul>;
  };
export default TodoList;
