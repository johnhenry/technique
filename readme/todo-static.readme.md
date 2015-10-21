#Todo Static

Todo Static is composed of two main parts : a *controller* and a *renderer*, along with your application's *state* that connects them.

The abstract purpose of this application is for the *controller* to control the _state_ and for your *renderer* to _render_ it into a view.


##State

The *State* contains all the information available to a user at a given point. The rest of the application is mostly dressing around this.

You state can be anything object in your language. For the examples, we use a standard JavaScript as they are easily composed with other objects and read by React.

###State Schema

Just because your state _can_ be anything doesn't mean that it should. It's always a good idea to enforce some sort of schema on your applications state, or at least define it so you have a good understanding of your app.

```javascript
/*
schema:
  state:
  {
    name: String,
    todos: List<String>
  }
*/
```

##Controller

It's the Controller's to update the state and call the renderer.

###Update Functions(= :state -> :state)

Within the constructor, we construct update functions, and apply them to the state.
We place our update functions inside of a dictionary as a way to organize them.

```javascript
//controller.partial.js
var state = {
  name: ''
  ,todos: []
}

var cloneState = state => JSON.parse(JSON.stringify(state));

var actionDictionary = {
  __proto__ : null,
  'update-name': name => state => {
    var newState = cloneState(state);
    newState.name = name;
    return newState;
  }
  ,'add-todo' : todo => state => {
    var newState = cloneState(state);
    newState.todos.push(todo);
    return newState;
  }
  'reset': name => state => {
    var newState = cloneState(state);
    newState.todos = [];
    return newState;
  }
};

var newState =
actionDictionary('add-todo')('eat lunch')(
  actionDictionary('add-todo')('go shopping')(
    actionDictionary('add-todo')('james')(state)));//{name: 'james', todos:[ 'go shopping', 'eat lunch']}
```

We need a way to trigger when and how a controller updates the state.

###Actions

The Controller may receive *actions* from the rendered view, or some other source.

Controller <-(actions)- ?Source?

Ideally we'd like to construct choose and construct update functions based on actions.

###Action Schema

Like state, actions can be anything, but we use JavaScript Objects for simplicity.
Also, like state, it is convenient to define a schema for actions.

```javascript.js
//action.schema.js
/*
schema:
  action:
  {
    type: Strut ['update-name', 'add-todo'],
    payload: *
  }
    action(type='add-todo'):
    {
      payload: String
    }
    action(type='update-name'):
    {
      payload: String
    }
    action(type='reset'):
    {

    }
*/
```


With actions defined, we can create a full controller module:
```JavaScript
//file:action-dictionary.js

var cloneState = state => JSON.parse(JSON.stringify(state));

export default {
  __proto__ : null,
  'update-name': name => state => {
    var newState = cloneState(state);
    newState.name = name;
    return newState;
  }
  ,'add-todo' : todo => state => {
    var newState = cloneState(state);
    newState.todos.push(todo);
    return newState;
  }
  'reset': name => state => {
    var newState = cloneState(state);
    newState.todos = [];
    return newState;
  }
};

```

```javascript
//file:controller.js
import {render, subscribe} from './renderer';
import {actionDictionary} from './action-dictionary'
//We'll learn more about the renderer module soon...
var state = {
  ,name: ''
  ,todos: []
}

var onAction = function(action){
  if(typeof actionDictionary[action.type] === 'function'){
    var update = actionDictionary[action.type](action.payload)
    state = update(state);
    render(state);
  }
};
subscribe(onAction);
render(state);
```

Notice that we're importing two functions from the "renderer" module: _render_ and _subscribe_.

The _render_ function the primary component of the renderer module, and we'll get into that soon.

The _subscribe_ allows the renderer to call the controller's _onAction_ function in order to it actions.
Admittedly, this is a little awkward, but it works... for now.

You'll also notice that we've extracted the command dictionary into a separate file.

At this point, we can only create a partial renderer module:

```javascript
//file:renderer.partial.js
var onAction;
var render = /* we'll learn how to define this in the View Module section */;
var subscriptions = [];
var subscribe = callback => {
  subscriptions.push(callback);
};
//The renderer should make calls to onAction from in response to user action.

export {render, subscribe}
```

##Renderer

The render renders the state into a view with with the user interacts.

Renderer(State) -> View

It's useful to simplify your renderer to a *render* function to which the state can be passed. The focus of this section is to learn how to create a renderer module that exports a render function.

Though the ideas can be easily abstracted, we'll do this using React.

###Element Definition
The Element Definition is transformed into a function that when combined with a state
We'll can use an object as a Element Definition, though React can also use a JavaScript class.

With React, you most often see Class Definitions written with JSX

```javascript
var elementDefinition = {
  render : function(){
    var i = 0;
    var todos = props.todos.map(todo => {
      return <li key={i++} >{todo}</li>;
    });
    return <html>
      <body>
        <h1>{this.props.name}</h1>
        <ul>
          {todos}
        </ul>
      </body>
    </html>;
  }
}
```

They can also be written in pure JavaScript

```javascript
var elementDefinition = {
  render : () => React.CreateElement('html', React.CreateElement('body'));
}
```


###Element Constructor
The Element Constructor is created from an Element Definition.

```javascript
var elementDefinition = /*some class definition*/;
```

In React, it can be created by passing a Element Definition to React.createClass

```javascript
//React.createClass = :Element Definition -> :Element Constructor
var ElementConstructor = React.createClass(elementDefinition);
```

Or by using a Class Definition to extend React.Element

```javascript
//React.Element is an Element Constructor
class ElementConstructor extends React.Element{
  render(props){
    var i = 0;
    var todos = props.todos.map(todo => {
      return <li key={i++} >{todo}</li>;
    });
    return <html>
      <body>
        <h1>{props.name}</h1>
        <ul>
          {todos}
        </ul>
      </body>
    </html>;
  }
}
```

###Element Factory (= :State -> :Element)
An Element Factory is a function that takes a state (in React documentation, this is a set of properties, or "props"), and returns an element to be rendered.

An Element Factory is created from a Element Constructor
Element Factory : Element Constructor -> Element Factory

```javascript
var ElementConstructor = /*some element constructor*/;
```

In React, it can be created by passing an Element Constructor to React.createFactory

```javascript
//React.createFactory = :ElementConstructor -> ElementFactory
var ElementFactory = React.createFactory(ElementConstructor);
```

We could also create an Element factory using a curried version of React.CreateElement
Element Factory : Element Constructor -> State -> Element

```javascript
var ElementFactory = (ElementConstructor => state => React.CreateElement(ElementConstructor, state))(ElementConstructor);
```
Or, by taking advantage of the closure...

```javascript
var ElementFactory = state => React.CreateElement(ElementConstructor, state);
```

###Renderer (= :Element -> (Rendered Output))
An element renderer takes an element (essentially state state wrapped in instructions describing how to render it) and renders it.


```javascript
var Element = /*some element*/;
```

Using ReactDOMServer, once can render an element direct to a string:

```javascript
ReactDOMServer.renderToStaticMarkup(Element);
//OR
ReactDOMServer.RenderToString(Element);
```

The difference beyond the two is beyond the scope of this article, but read [here]() for more.

###Renderer, External (:Element -> ???)

When we want to render to an external target, such as the DOM, we use an external render that allows us to define said target.
The [ReactDom]() library allows for this.

```javascript
var Element = /*some element*/;
```

[ReactDOM]() allows you to render to an element on a web page

```javascript
import ReactDOM from 'ReactDOM';
var DOMElement = window.document.getTagsByName('html')[0];
ReactDOM.render(Element, DOMElement);
```

###Render Function

The above Element Renderer function takes an element and renders it. We'd prefer to render a state's component directly.

```javascript
var render = state => Renderer(ElementFactory(state));
```


We can now create a full renderer module that exports our render function

```javascript
//file:renderer.js
/*
schema:
  state:
  {
    name: String,
    todos: List<String>
  }
  action:
  {
    type: Strut ['update-name', 'add-todo'],
    payload: *
  }
    action(type='add-todo'):
    {
      payload: String
    }
    action(type='update-name'):
    {
      payload: String
    }
*/
var React = require('react');
var ReactDOM = require('react-dom');
var onAction;
var subscribe = callback => {
  onAction = callback;
};
var elementDefinition = {
  handleSubmit: function(e){
    e.preventDefault();
    onAction({type: 'add-todo', payload: this.refs.todo.value.trim()});
    this.refs.todo.value = '';
    return;
  },
  render: function(){
    var i = 0;
    var todos = props.todos.map(todo => {
      return <li key={i++} >{todo}</li>;
    });
    return <html>
      <body>
        <h1>{this.props.name}</h1>
        <ul>
          {todos}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='to do' ref='todo' />
          <input type='submit' value='Post Todo' />
        </form>
      </body>
    </html>;
  }
};
var renderTarget        = document.getElementsByTagName('html')[0];
var ElementConstructor  = React.createClass(elementDefinition);
var ElementFactory      = React.createFactory(ElementConstructor);
var Renderer            = element => ReactDOM.render(element, renderTarget);
var render              = state => Renderer(ElementFactory(state));
export default {render, subscribe};
```

###Components, Styling and Modularity

Using React, you can break your renderer into multiple files and nested components.

Style Processors, such as [PostCSS](https://github.com/postcss/postcss) all you to do the same for your css.

This is a great way to organize you code!

```javascript
//file:todo-list.js
/*
schema:
  state:
  {
    name: String,
    todos: List<String>
  }
*/
var React = require('react');
var TodoList = React.createClass({
  render: function(){
    var i = 0;
    var todos = props.todos.map(todo => {
      return <li key={i++} >{todo}</li>;
    });
    return
        <ul>
          {todos}
        </ul>;
  }
});
export default TodoList;
```

```css
/*todo-list.css*/
  ul.TodoList{
    /*list styles*/
    li{
      /*list styles*/
    }
  }
```

```javascript
//file:todo-form.js
/*
schema:
  action:
  {
    type: Strut ['update-name', 'add-todo'],
    payload: *
  }
    action(type='add-todo'):
    {
      payload: String
    }
*/
var React = require('react');
var TodoForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    this.props.onSubmit(
      {type: 'add-todo',
      payload: this.refs.todo.value.trim()});
    this.refs.todo.value = '';
    return;
  },
  render: function(){
    return <form className={this.props.className}>
          <input type='text' placeholder='to do' ref='todo' />
          <button type='button' onClick={this.handleSubmit} >Post Todo</button>
        </form>;
  }
})
export default TodoForm;
```

```css
/*todo-form.css*/
form.TodoForm{
  /*form styles*/
  input[type=text]{
    /*input(text) styles*/
  }
  button{
    /*button styles*/
  }
}
```

```javascript
//file:renderer.js
/*
schema:
  state:
  {
    name: String,
    todos: List<String>
  }
*/
var React = require('react');
var ReactDOM = require('react-dom');
import TodoList from './todo-list';
import TodoFrom from './todo-list';
var onAction;
var subscribe = callback => {
  onAction = callback;
};

var elementDefinition = {
  onAction: function(todo){
    return onAction(todo);
  },
  render: function(){
    var i = 0;
    var todos = props.todos.map(todo => {
      return <li key={i++} >{todo}</li>;
    });
    return <html>
      <body>
        <h1>{this.props.name}</h1>
        <TodoList todos={this.props.todos} />
        <TodoForm onSubmit={this.onAction} />
      </body>
    </html>;
  }
};
var renderTarget        = document.getElementsByTagName('html')[0];
var ElementConstructor  = React.createClass(elementDefinition);
var ElementFactory      = React.createFactory(ElementConstructor);
var Renderer            = element => ReactDOM.render(element, renderTarget);
var render              = state => Renderer(ElementFactory(state));
export default {render, subscribe};
```

```css
/*renderer.css*/
body{
  /*body styles*/
  @import './todo-list.css';
  @import './todo-form.css';
}
```


CSS is case insensitive, thought it may be useful to use upper case classes for your components.

In these cases, it may be useful to pass a className property into an element's top level rendered component.

```javascript
//from-file:toto-list.js
//...
    <ul className={this.props.className}>
      {todos}
    </ul>;
//...
```

```javascript
//from-file:toto-form.js
//...
    <form onSubmit={} className={this.props.className}>
      <input type='text' placeholder='to do' ref='todo' />
      <input type='submit' value='Post Todo' />
    </form>
//...
```


```javascript
//from-file:renderer.js
import TodoList from './todo-list';
import TodoForm from './todo-form';
//...
<html>
  <body>
    <h1>{this.props.name}</h1>
    <TodoList todos={this.props.todos} className='TodoList'/>
    <TodoForm onSubmit={this.onAction} className='TodoForm' />
  </body>
</html>;
//...

```


```javascript
var React = require('react');
var TodoList = React.createClass({
  render: function(){
    var i = 0;
    var todos = this.props.todos.map(todo => {
      return <li key={i++}>{todo}</li>;
    });
    return
        <ul className={this.props.className}>
          {todos}
        </ul>;
  }
});
export default TodoList;
```
