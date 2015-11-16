import React from 'react';
import TodoList from './todo-list';
import TodoForm from './todo-form';
var Body = React.createClass({
  render: function(){
    return <body>
      <h1>Todo Applicaiton</h1>
      <div>
        <div className="TodoApplication">
        <h1>Todo List</h1>
        <TodoList todos={[]} className="TodoList"/>
        <TodoForm className="TodoForm"/>
        </div>
      </div>
    </body>;
  }
});
export default Body;
