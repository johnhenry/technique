const React = require('react');
export default React.createClass({
  postTodo: function(e){
    e.preventDefault();
    const payload = this.todo.value.trim();
    this.todo.value = '';
    return this.props.onSubmit(
      {
        type: 'add-todo',
        payload: payload
      });
  },
  clearTodos: function(e){
    e.preventDefault();
    return this.props.onSubmit({type: 'reset'});
  },
  render: function(){
    return <form className={this.props.className}>
          <input type="text" placeholder="to do" ref={(ref) => this.todo = ref} />
          <button type="button" className='PostTodo' onClick={this.postTodo} ></button>
          <button type="button" className='ClearTodo' onClick={this.clearTodos} ></button>
        </form>;
  }
});
