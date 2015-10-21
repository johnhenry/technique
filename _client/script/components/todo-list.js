var React = require('react');
var TodoList = React.createClass({
  render: function(){
    var i=0;
    var todos = this.props.todos || [];
    todos = this.props.todos.map(todo => {
      return <li key={i++}>{todo}</li>;
    });
    return <ul className={this.props.className}>
          {todos}
        </ul>;
  }
});
export default TodoList;
