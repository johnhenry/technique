#Technique

This is a set techniques, ideas, concepts, and conventions used for creating maintainable, scalable applications.
I present them in the form of three applications, along with documentation detailing how each is built.

##Introduction

The main idea behind each or the applications that there are three primary parts: the *state* the *controller* and the *renderer*.
The *state* represents any information available to a user at any given point in time, and the rest of the application is either concerned with updating the state via the *controller* or presenting the state to the user via the *renderer*;

##Applications

The applications below are written in [JavaScript ES6/2015](http://www.ecma-international.org/ecma-262/6.0/), but the concepts can likely be applied in any other language.
We also make light usage of the [React](https://facebook.github.io/react/) and [Koa](http://koajs.com/) libraies, but again, this is not necessary to understand the core concepts.
Being a loose set of ideas and not a full framework, the programmer can freely integrate them into any project.

Assuming that you have [git](https://git-scm.com/), [node, and npm](http://www.nodejs.org) already installed, you can install the (this) base application like so:

```bash
git clone git@github.com:johnhenry/technique.git
cd technique
npm install
```

Once installed, you can build each of the applications by running it's specific build command.

```
npm run build-<sample application name>
```
###Server

Each of the applications include static files that can be severed with the included server.
For these apps, we may run the included server that server these files from the _/client_ directory after running each app's build command.

```
npm run server
```

Please note that aside from serving static files, the server servers a specific purpose for the Todo Server Application.

Also please note: we take advantage of the ["babel/register"](https://babeljs.io/docs/setup/#babel_register) module in order to take advantage of some of the newer featurs of JavaScript without having to complie before running.

###Client - Build Scripts

Each application has an associated _build_ folder and script to generate its static assets and put them in the _/client_ directory.

####script.js
Applications that generate a _script.js_ file do so by concatenating assets from within the script folder, according to *build/script/\_.js*.

#####JS ES6/2015
In completely es6 compliant browsers, including the  \_.js file in your browser would be sufficient, but by running the build script, allows us to use these feature in current browsers. We take advantage of [babelify](https://github.com/babel/babelify). To accomplish this.

In addition, the scripts we use [browserify](http://browserify.org/) to pull in scripts loaded with npm, so it can be used as a package manager for front-end code as well as backend.

Note, not all E6 features are available, and in some cases, the transpilation is unreliable so we must fall back to using older features. Specifically, in some instances ES6 imports produce irreconcillable errors. In these cases, we fall back to  using "require" from "Common JS" syntax.

#####JSX
JSX can be incorporated into source files. It will be compiled into plain JavaScript during the build step.

####style.css
Applications generate a _style.css_ file by concatenating assets from within the _style_ folder, according to *build/style/ \_.css*.

###Concatenation and Importing, and CSS 4.0
Concatenation and Importing are not native features of CSS, but are enabled via the [postcss](https://github.com/postcss/postcss) processor. In addition, the processor allows us to incorporate some features from CSS 4.0 in the styling in the same way that we can incorporate JS ES6 into our scripts.


####?.html
Applications generate a _html_ files by rendering pages created with React components directly to static text files.

####assets
For convenience, all item within the _assets_ folder are copied into an _assets_ folder within the _client_ directory.

###Application List

####1. Todo (Static)

*Todo (Static)* is a simple static web page that keeps track of todos.

#####Installation

To build the application type:

```
npm run build-todo-static
```

NOTE: It's likely that this was built after installation.


To start the server type:

```
npm run server
```

and visit [localhost:3000](http://localhost:3000). You can change the port in "./settings.js"

#####State and Schema

Your state can be anything object in your language. For the examples, we use a standard JavaScript library as they are easily composed with other objects and read by React.

Just because your state _can_ be anything doesn't mean that it should. It's always a good idea to enforce some sort of schema on your applications state, or at least define it so you have a good understanding of your app.

We'll store the state in memory retrieve it via functions that return Promises so that we can manipulate and read it asynchronously.

```javascript
//filename:state.js
/*
schema:
  state:
  {
    name: String,
    todos: List<String>
  }
*/

var state;
var getState = context => Promise.resolve(state);
var setState = newState => Promise.resolve(state = newState);
export default {getState, setState};
```
#####Controller, Instructions and Schema

The controller must modify the state, but needs some sort of trigger telling it how to modify the state. We do this by creating a map between *instructions* and functions that modify state with an instruction dictionary.

Like state, instructions can be anything, but we use JavaScript Objects for simplicity.
Also, like state, it is convenient to define a schema for instructions.

```javascript
//filename:instruction-dictionary.js
/*
schema:
  instruction:
  {
    type: Strut ['update-name', 'add-todo'],
    payload: *
  }
    instruction(type='add-todo'):
    {
      payload: String
    }
    instruction(type='update-name'):
    {
      payload: String
    }
    instruction(type='reset'):
    {

    }
*/
const BASESTATE = {
  name: 'Todo List'
  ,todos: []
};
var cloneState = state => {return JSON.parse(JSON.stringify(state))};
var instructionDictionary = {
  __proto__ : null
  ,'update-name': name => state => {
    var newState = cloneState(state);
    newState.name = name;
    return newState;
  }
  ,'add-todo' : todo => state => {
    var newState = cloneState(state);
    newState.todos.push(todo);
    return newState;
  }
  ,'reset': () => () => cloneState(BASESTATE)

};
export default instructionDictionary;
```

Now that we have the instruction dictionary, we want to asynchronously resolve the instruction into a function, as we do so with getUpdate.

```javascript
//filename:get-update.js
import instructionDictionary from './instruction-dictionary';
var getUpdate = instruction => Promise.resolve(instructionDictionary[instruction.type](instruction.payload));
export default getUpdate;
```

Well soon define how the renderer works. For now, that it exports two functions for communication:
 - the _render_ function accepts state and renders it for the user to experience.
 - the _subscribe_ function allows a function to subscribe to instructions from the view. We pass a subscription function to the subscribe function. The subscription function updates the state, and passes it to the renderer whenever it receives an instruction.

```javascript
//filename:controller.js
import getUpdate from './get-update';
import {getState, setState} from './state';
import {render, subscribe} from './renderer';
var subscription = instruction => {
  return getState().then(state=>{
    getUpdate(instruction).then(update=>{
      setState(update(state)).then(render)
    });
  });
};
subscribe(subscription);
var init = () => subscription({type: 'reset'});
export default init;
```

#####Renderer

It's useful to simplify your *renderer* to a _render_ function to which the state can be passed. The below renderer incorporates react components and exports render function that renders state, as a JavaScript object, directly to the DOM

```javascript
//filename:todo-list.js
var React = require('react');
var TodoList = React.createClass({
  render: function(){
    var i=0;
    var todos = this.props.todos.map(todo => {
      return <li key={i++}>{todo}</li>;
    });
    return <ul className={this.props.className}>
          {todos}
        </ul>;
  }
});
export default TodoList;
```


```javascript
//filename:todo-form
var React = require('react');
var TodoForm = React.createClass({
  postTodo: function(e){
    e.preventDefault();
    var payload = this.refs.todo.value.trim();
    this.refs.todo.value = '';
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
          <input type="text" placeholder="to do" ref="todo" />
          <button type="button" className='PostTodo' onClick={this.postTodo} ></button>
          <button type="button" className='ClearTodo' onClick={this.clearTodos} ></button>
        </form>;
  }
})
export default TodoForm;
```

```javascript
var React = require('react');
var ReactDOM = require('react-dom');
import TodoList from './components/todo-list';
import TodoForm from './components/todo-form';
import document from './window/document';
var subscriptions = [];
var subscribe = callback => {
  subscriptions.push(callback);
};
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
var render              = state => Renderer(ElementFactory(state));
export default {render, subscribe};
```

Note the renderer also exports a subscribe function that allows an outside function to subscribe to instructions emitted by the renderer.


###Components, Styling and Modularity

The main reason for using a css processor, is so that we can organize our css into a file system that mirrors our component structure.

Doing this allows us to style by structure, minimizing the use of classes and ids.

```css
/*filename:todo-list.css*/
.TodoList{
  width:100%;
  height:50%;

  li{
    color:red;

  }
}
```

```css
/*filename: todo-form.css*/
.TodoForm{
  width:100%;

  input[type=text]{
    color:green;
  }
  button{
    color:blue;
  }
  button.PostTodo::before{
    content: "Post Todo";
  }
  button.ClearTodo::before{
    content: "Clear Todo";
  }
}

```

```css
/*filename: _.css*/
html{
    height:100%;

    body{
        height:100%;

        div{
          height:100%;

          h1{

          }
          @import './todo-list.css';
          @import './todo-form.css';
        }
    }
}
```


####2. Todo (Server)

*Todo (Server)* is almost identical to *Todo (Client)*, except it communicates with a server to manipulate and store the application's state. We'll take a look at the modifications that we need to make to our Todo (Client) application, as well as what we need to build the server.


#####Installation

To build the client application type:

```
npm run build-todo-server
```

To start the server application type:

```
npm run server
```

and visit [localhost:3000](http://localhost:3000). You can change the port in "./settings.js"

#####State Controller and Client
For this application, state is handled on the server rather than the client, but in exactly the same way. We can use the code from the client's _state.js_ on the without modification.


#####Controller - Client
Because state is handled and updates are handles on the server, we can leave these out.
The only thing that we do is modify the subscription function to forward instructions to the server and renders the response.

```javascript
//filename:controller.server.js
import {render, subscribe} from './renderer';
import fetch from './window/fetch';
var subscription = instruction => {
  return fetch('/', {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: instruction ? JSON.stringify(instruction) : instruction
    })
    .then(response => response.json())
    .then(render);
};
subscribe(subscription);
var init = () => subscription();
export default init;
```

Note: rather than accessing the _window_ object globally, we export it from a module.


#####Controller - Server
Like _state_, _updates_ are handled on the server rather than the client, but in exactly the same way. So we can use the code from the client's _get-update.js_ on the without modification as well.

A slight change is the source of _instructions_ -- we'll set up our _subscription_ function as koa middleware, and have it will respond to _requests_ rather than instructions.


Aside from these minor changes, the controller on the client and the controller on the server are very similar.






```javascript
//filename:server/controller.js
import getUpdate from '../_client/script/get-update';
import {getState, setState} from '../_client/script/state';
import getRenderer from './get-renderer';
var subscription = function * (){
  try{
    var state = yield getState(this);
    var render = yield getRenderer(this);
    if(!(this.request.body && this.request.body.type)){
      return render(state);
    }else{
      var update = yield getUpdate(this.request.body);
      return setState(update(state)).then(render);
    }
  }catch(error){
    this.statusCode = 404;
    this.body = error;
  }
};
getUpdate({type:'reset'}).then(update => setState(update()));//Initialize
export default subscription;
```

#####Renderer - Server

Rather than have a single static renderer, we've incorporated a _getRenderer_ method othat will allows use to use a method of our choosing.

```javascript
//filename:server/get-renderer.js
import jsonRenderer from './renderers/json';
var getRenderer = context=>Promise.resolve(jsonRenderer(context));
export default getRenderer;

```

The client renderer rendered the state of the application to a browser page. The idea here is that the state is data coming from the server, so makes sense to render it as a server response instead.

```javascript
//filename:renderers/json.js
export default context => state => {
  context.type = 'application/json';
  context.status = 200;
  context.body = state;
  return state;
};
```

#####Renderer - Client

There is no change in the renderer for the client. It accepts a state and emits instructions in the same way as the previous application.




####3. Blog (Static)

*Blog (Static)* abstracts and extends the concepts of *state*, *controller*, and *renderer* outside of the realm of programming languages.

#####Installation

To build the application type:

```
npm run build-blog-static
```

To start the server type:

```
npm run server
```

and visit [localhost:3000](http://localhost:3000). You can change the port in "./settings.js"


###State
Here the state is a set of files that will be rendered. You modify the state by editing the files directly.

###Renderer
Here the render function is the build script that transforms the set of markdown files, into a set of html files with which the user will interact.


###Controller
You are the controller. You decide how to update the state (edit the files), and you decide when to render the state (run the build script)
