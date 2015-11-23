var React = require('react');
var ReactDOM = require('react-dom');
import TodoList from "../../component/todo-list";
import TodoForm from "../../component/todo-form";
import window from "../../script/window";
var document = window.document;
export const subscriptions = [];
var runSubscription = function(data){
  return subscriptions.forEach(subscription => subscription(data));
};

var elementDefinition = {
  handleSubmit: runSubscription,
  render: function(){
    return <div className='TodoApplication'>
        <h1>{this.props.name}</h1>
        <TodoList todos={this.props.todos} className='TodoList' />
        <TodoForm onSubmit={this.handleSubmit} className='TodoForm' />
    </div>;
  }
};
var ElementConstructor  = React.createClass(elementDefinition);
var ElementFactory      = React.createFactory(ElementConstructor);
export const render     = renderTarget => state => ReactDOM.render(ElementFactory(state), renderTarget);
