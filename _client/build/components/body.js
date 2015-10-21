import React from 'react';
import TodoList from '../../script/components/todo-list';
import TodoForm from '../../script/components/todo-form';
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
