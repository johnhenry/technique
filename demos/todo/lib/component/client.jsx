const React = require('react');
import TodoList from './lib/todo-list.jsx';
import TodoForm from './lib/todo-form.jsx';
export default ({subscribers}) => {
  return {
    handleSubmit : data => subscribers.forEach(
      subscriber => subscriber(data)),
    render : function(){
      return <div className='TodoApplication'>
          <h1>{this.props.name}</h1>
          <TodoList todos={this.props.todos} className='TodoList' />
          <TodoForm onSubmit={this.handleSubmit} className='TodoForm' />
      </div>;
    }
  }
};
