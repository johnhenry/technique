import React from 'react';
import TodoList from './todo-list';
import TodoForm from './todo-form';
var Body = React.createClass({
  render: function(){
    return <body>
      <div>
        <h1>Todo List</h1>
        <TodoList todos={[]} className="TodoList"/>
        <TodoForm className="TodoForm"/>
      </div>
    </body>;
  }
});
export default Body;
