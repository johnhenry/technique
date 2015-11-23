const React = require('react');
const ReactDOM = require('react-dom');
import TodoList from '../../component/todo-list';
import TodoForm from '../../component/todo-form';
import document from '../../script/window/document';
export const subscriptions = [];
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
export const render       = renderTarget => state => ReactDOM.render(
  ElementFactory(state), renderTarget);
