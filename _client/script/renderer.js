var React = require('react');
var ReactDOM = require('react-dom');
import TodoList from "./components/todo-list";
import TodoForm from "./components/todo-form";
import window from './window';
var document = window.document;
var subscriptions = [];

var runSubscription = function(data){
  return subscriptions.forEach(subscription => subscription(data));
};

var elementDefinition = {
  handleSubmit: runSubscription,
  render: function(){
    var i = 0;
    var todos = this.props.todos.map(todo => {
      return <li key={i++}>{todo}</li>;
    });
    return <div>
        <h1>{this.props.name}</h1>
        <TodoList todos={this.props.todos} className='TodoList' />
        <TodoForm onSubmit={this.handleSubmit} className='TodoForm' />
    </div>;
  }
};
var renderTarget        = document.getElementsByTagName('div')[0];
var ElementConstructor  = React.createClass(elementDefinition);
var ElementFactory      = React.createFactory(ElementConstructor);
var Renderer            = element => ReactDOM.render(element, renderTarget);
export const render     = state => Renderer(ElementFactory(state));
export const subscribe  = callback => {
  subscriptions.push(callback);
};
