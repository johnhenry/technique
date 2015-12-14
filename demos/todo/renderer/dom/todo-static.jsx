const React = require('react');
const ReactDOM = require('react-dom');
import TodoList from '../../component/todo/lib/todo-list.jsx';
import TodoForm from '../../component/todo/lib/todo-form.jsx';
import document from '../../lib/window/document';
export default renderTarget => {
  const subscriptions = [];
  const elementDefinition = {
    handleSubmit : data => subscriptions.forEach(
      subscription => subscription(data)),
    render : function(){
      return <div className='TodoApplication'>
          <h1>{this.props.name}</h1>
          <TodoList todos={this.props.todos} className='TodoList' />
          <TodoForm onSubmit={this.handleSubmit} className='TodoForm' />
      </div>;
    }
  };
  const ElementConstructor  = React.createClass(elementDefinition);
  const ElementFactory      = React.createFactory(ElementConstructor);
  return {
    subscriptions,
    render : state => ReactDOM.render(ElementFactory(state), renderTarget)
  }
};
