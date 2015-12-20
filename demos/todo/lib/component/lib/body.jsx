import React from 'react';
import TodoList from './todo-list';
import TodoForm from './todo-form';
export default ({name='Todo List', todos=[]}={name:'Todo List',todos:[]}) => <body>
  <h1>Todo Applicaiton</h1>
  <div>
    <div className="TodoApplication">
    <h1>{name}</h1>
    <TodoList todos={todos} className="TodoList"/>
    <TodoForm className="TodoForm"/>
    </div>
  </div>
</body>;
