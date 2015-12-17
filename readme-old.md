#Technique

This is a set of techniques that I've learned over the years while programming. Following these guidelines will allow you to easily create maintainable, scalable, and debuggable applications.

Many of the techniques rely on specific features of the JavaScript (ES6/2015), but the concepts are widely applicable in other languages.

This document is split into two main parts: Part One focuses on a set of concepts while part two focuses on applications built with these concepts in mind.

##Part One. -- Concepts

###Functional Programming

For my intents and purposes, when speaking of "Functional Programming" an application is composed primarily of _stateless_, _(optionally) higher-order_ _functions_.


Being _stateless_ means that invoking a function does not affect the anything outside of that function. It simply produces an output, and does not modify anything, not even the value(s) passed into it.

```javascript
var count = 0;
const processAndCount = function(thing){
  /*process given thing*/;
  count++;
}
```

Being _higher-order_ means that values passed into and returned from a function may also be functions, in addition to other data types supported by the language.

```javascript
const compose = function(func1, func2){
  return function(thing){
  return func2(func1(2));
}
};
```

(Note, many languages other than don't allow for higher order functions, but you can achieve a similar effect by attaching functions as methods to objects and passing those objects to and from functions.)

####Functions vs. Classes

Favor a functional factory pattern when creating objects within an application like this:

```javascript
const personFactory = function(initialAge = 0){
  var age = initialAge;
  return {
    getAge:function(){
      return age;
    },
    increaseAge:function(){
      return ++age;
    }
  }
}
const person = personFactory(0);
```
Avoid rather than using a constructor to create objects from a class.

```javascript
class Person(){
  constructor(initialAge = 0){
    this.age = initialAge;
  }
  getAge(){
    return this.age;
  }
  increaseAge(){
    return ++this.age;
  }
}
const person = new Person();
```

Classes are useful when inheritance is necessary, though I can't recall having it ever being truly useful. And there are a number of [arguments against it](http://stackoverflow.com/questions/49002/prefer-composition-over-inheritance).

Classes are useful for name spacing, but _built-in objects_, _maps_ or _modules_ are likely easier to use with less baggage.

It's my advice to simply avoid using classes all together.

###Immutability

Any values (variables), should declared at the beginning of functions/blocks in which they are used and not mutated. As variables are not mutated, all declarations should use either the 'const' or the 'import' keyword. Avoid user of 'let' and 'var'. If you see either of these in your code, you should think long and hard about why it's there and whether or not you could factor it out.

Avoiding mutation makes reasoning about your code easier. Mutation makes it difficult to find the source of bugs, and code can be optimized to run much faster if you avoid mutable variables.

Avoid any declarations that use 'var' or 'let'.


###Componentization

Each part of an application is composed of small, simple components that may in turn be composed of even simpler components.

Use modules to organize your components, and only export singular functions (or a small set of closely related functions) from each. In some cases, you may want to export other JavaScript objects besides functions.

This will help you to reuse code throughout your application and avoid wasteful duplication.

Here is an example of a very simple application:

```JavaScript
//simpler-conversation.js
['John', 'James', 'Jamal'].forEach(member=>{
  alert('hello' + member);
  setTimeout(() => alert('goodbye' + member), 1000);
});
```

We can break it into components like so:

```JavaScript
//file:say-hello.js
export const sayHello = name => alert('hello ' + name);
```

```JavaScript
//file:say-goodbye.js
export const sayGoodBye = name => alert('goodbye ' + name);
```

```JavaScript
//file:name.js
export const TEAM = ['John', 'James', 'Jamal'];
```

```JavaScript
//file:conversation.js
import sayHello from './say-hello';
import sayGoodbye './say-goodbye';
import team from './team';
team.forEach(member=>{
  sayHello(member);
  setTimeout(() => sayGoodbye(member), 1000);
});
```
This is more complicated than _simple-conversation.js_, but now we can can now easily modify parts of the application without affecting each other or the main application in _conversation.js_.

###Visual Components

The visual part of an application should componentized as well.

We'll use [React]() -- it allows us not only [define visual components as functions](), we can use JSX to compose our components as HTML.

```JavaScript
//messages-button.js
import React from 'react';
export const ClickButton = ({click, className}) =>
 <button className={className} onClick={click}>Click for message</button>
```
Note that we've passed in the _className_ attributes

```JavaScript
//messages.js
import React from 'react';
import ClickButton from './click-button';
const clickFunction = (message) => () => alert(message);
export const Messages = () => <div className='Messages'>
 <ClickButton className='a' click={clickFunction('message a')}/>
 <ClickButton className='b' click={clickFunction('message b')}/>
 <ClickButton className='c' click={clickFunction('message c')}/>
</div>;
```

```JavaScript
//message-application.js
import ReactDOM from 'react-dom';
import Messages from './messages';
ReactDOM.render(Messages(), document.getElementById('react-render-target'));
```

```html
<!--application.html-->
<!doctype html>
<html>
 <head>
 <script src='./message-application.js' defer></script>
 </head>
 <body>
 <div id='react-render-target'></div>
 </body>
</html>
```

###Controller-Renderer/View Pattern

The main functionally of your application is encapsulated into two main types of components that communicate unidirectionally:

  - Controllers modify an application's state in response to _instructions_, which come from the user (indirectly through the _view_) or some other source (a server, another controller, etc.) and send the updated state to a renderer.

  - Renderers accept an application's state and transform (or "render") it into something with which the user interacts (a _view_). This is usually in the form of a webpage or elements on a web page but abstractly could be anything including formatted data, audio files, or 3D printed objects.  A view may or may not be interactive, i.e. it has a method of passing instructions to a controller.

Generally, we use channels, represented by _'->'_ to exchange data unidirectionally between components. To be explicit about type of data flowing across the channel across a channel like so: _'-(data type)->'_.

This:
```
[component A] <-
|              | or equivalently [component A] -> [component B] -> [component A]
-> [component B]
```

is preferred to this:

```
[component A] <-> [component B]
```

For this implementation, each component is implemented as a module and each channel is a function exported from the module. The controller exports a _send_ method that accepts an instruction, and the renderer/view exports a _render_ method that accepts a state. Each module also exports a _subscriptions_ array -- each component sequentially call every function within in this array with a it's result (an state or an instruction, recpectively) when an update takes place.

```
 -(instructions)-> [controller] -(state)-> [renderer/view] -(instructions)->
```

```javascript
import {send, subscriptions} from 'controller';
import {render, subscriptions as viewSubscriptions} from 'renderer';
const initialInstruction = undefined;
subscriptions.push(render);
viewSubscriptions.push(send);
send(initialInstruction);
```

Because of the loosely coupled nature, we can easily orchestrate multiple components:

```javascript
import {send as sendA, subscriptions as subsA} from 'controllerA';
import {send as sendB, subscriptions as subsB} from 'controllerB';
import {send as sendC, subscriptions as subsC} from 'controllerC';
import {render, subscriptions as subs} from 'renderer';
import {render as renderE} from 'renderer-error';
const initialInstruction = undefined;
subs.push(instruction => {
switch(instruction.type){
  case 'A' : sendA(instruction); break;
  case 'B' : sendB(instruction); break;
  default  : sendC(instruction); break;
  }
  return instruction;
});
subsA.push(render);
subsB.push(render);
subsC.push(renderE);
sendC(initialInstruction);
```

Setting up components allows us to mix in other behaviors with ease. We could use functions to act as "middleware" between our main components.

Consider what would be needed to add custom storage for the state of our application, as well as logging and authentication for our instructions.

```javascript
import {send, subscriptions} from 'controller';
import {render, subscriptions as viewSubscriptions} from 'renderer';
import store from 'custom-store';
import log from 'custom-log';
import authenticate from 'custom-authenticate';
const initialState = undefined;
subscriptions.push(state => store(state).then(render));
viewSubscriptions.push(instruction => log(instruction).then(authenticate).then(send));
render(initialState);
```


###Build Scripts

Many of the above features are from version of [JavaScript]() that are not widely available in browsers. Thanks to [babel-core/register](), we have to jump through very few hoops in order to get these features working on the server, but the frontend is a whole different matter.

Most browsers will not currently work with my ahem, "future code", so I use build scripts to transpile it into code that has all of the desired features, but still works with most browsers.

There are also some tricks from "CSS 4.0", including the @import and the @extend functions and variables that allow you to write modular css to match your above modular JavaScript Code. There is also support for nesting, but this is a contraversial feature and should be used at our own risk.

To use build scripts, on the command line, type ```npm bulid``` followed by the application name.

```bash
npm run build [application]
```

To pass options, such as the help option, please pass '--' after the initial command before any options

```bash
npm run build [application] -- --help
```

####Browserify
I also use build scripts to allow me to [import npm packages into my browser code](). This allows me to use a unified package manager for both browser and sever code. [Bower]() can still be used to download scripts, but currently, any packges will be stored in the demos/assets/ folder and checked into version control.

##Part 2. -- Sample Applications

What's good telling you all of that without something to show for it?

After you've installing this repository with:

```bash
git clone /johnhenry/technique
cd technique
npm install

```

you can run each of these applications by running their respective build and (if necessary) server scripts. Check out the source and see how they each demonstrate the concepts above.


###Static Applications

These static applications are composed only of static pages. You _may_ be able to open them directly in a browser, but you'll likely need to run them on a static server. I encourage the use of [http-server]() for a number of reasons, but it may make sense to simply run the server for the dynamic <a href="#2-dynamic-todo">Todo application</a>, as it's already pointed to the appropriate directory.

###Todo <span id='2-static-todo'></span>

This application is a static, single page application. There is a single controller and the state is stored in memory as such, when the page is refreshed, all previous entries are cleared.

####Build

Build With:

```bash
  npm run build todo-static
```

####Run

Point a static server to the newly built 'static' folder.

Or run

```bash
  npm run serve
```
and visit [127.0.0.1:3000](127.0.0.1:3000).


####Usage
To add a todo, the user types interacts with the page (the view) by typing the box and clicking the "Add Todo" button. This sends an message (instruction) to the controller telling it to update the list of todos (the state). Once this is updated, it's given to the renderer to re-render the view.

####UsageDiagram

```
[view:html] -(instructions:json)->
^  [controller] -(state:json)->
|  [renderer:React] ->
[view:html]
```

###Blog <span id='2-static-blog'></span>

This application is a static, multi-page application with on logic on each page. Each page is generated by transforming markdown files into data and then rendering that data as strings and then to pages via React. Because it's static, any changes to the markdown files will require the application to be re-built.


####Build

```bash
  npm run build blog-static
```

####Run

Point a static server to the newly built 'static' folder.

Or run

```bash
  npm run serve
```
and visit [127.0.0.1:3000](127.0.0.1:3000).

###Meta Usage

The build process is perhaps more important than the application itself. Here, we can see that the build process can be seen as following the _Controller-Renderer_ model. The build scripts acts as a _renderer_. The markdown documents in the _data_ folder act as the application _state_. You, act as the _controller_ by modifying the files in the folder and running the scripts to transform them into a set of html file, which represent the _view_.

####Meta Usage Diagram

```
[controller:You] -(state:documents) ->
  [renderer:scripts]->
  [view:static files]
```

###Usage

This is a standard static website. Just visit it and click the links.
Pages are statically generated with the build script, so in order to modify the blog, edit the files in the _data_ folder and re-run the build script.

####Usage Diagram
```
[view:browser] -(interinstructions:http-request)->
^  [network]...
|
|  ...[network] -(instructions:http-request)->
|  [controller:server] -(state:static files)->
|
|  [network]...
|  ...[network] -(state:response[file])->
[view:browser]
```

###Dynamic Applications

###Todo <span id='2-dynamic-todo'></span>


This application is a dynamic, single page application. There are two controllers, one on the page, and one on the server. The one on the page simply relays data from the view to the server and from the server, to the rendere. The one on the server acts like the controller in the static todo application, in that it updates and relays state. Because the data is stored in the server's memory, when the page is refreshed, all previous entries remain.

####Build

```bash
  npm run build todo-static
```

####Run

```bash
  npm run serve todo
```
and visit [127.0.0.1:3000](127.0.0.1:3000).

####Usage

This is essentially the same as the previous todo application, except the state is processed remotely.
Rather than the controller processing instructions on the page, it passes them over the network to a second controller on the server. The server then interprets the instruction, modifies the state accordingly, renders the state across the network back to the original controller which then renders the state to the view.


####Usage Diagram

```
[view:html] -(instructions:json)->
^  [controller:browser] -(instructions:http request)->
|  [network]...
|
|  ...[network] -(instructions:http request)->
|  [controller:server] -(state:json)->
|  [renderer:json] ->
|  [network]...
|
|  ...[network] -(state:response[json])->
|  [controller:browser] -(state:json)->
|  [renderer:React] ->
[view:html]
```

###Blog <span id='2-dynamic-blog'></span>

This application is a dynamic, multi-page application with on logic on each page. Each page is generated per request by rudimentarily scanning and transforming markdown files into data, picking the proper one based on the request, and generating an HTML string based on the data, which it sends to the user. Because it is dynamic, any changes to the markdown files will require only a page refresh to be seen, but loading performance is not as good as in the static todo application.


####Build

```bash
  npm run build blog-server
```

####Run

```bash
  npm run serve blog
```
and visit [127.0.0.1:3000](127.0.0.1:3000).

####Usage

This is a standard website. Just visit it and click the links.
Pages are dynamically generated on each request, so modifying files in the _data_ folder will change the blog without the need for a restart.

####Usage Diagram

```
[view:browser] -(interinstructions:http-request)->
  [network]...

  ...[network] -(instructions:http-request)->
  [controller:server] -(state:dynamic files)->

  [network]...
  ...[network] -(state:response[file])->
[view:browser]
```

###Extending

Ideas for extending Applications

 - Static + dynamic Todo. Consider adding local storage to the static todo application such that the data persists even after refresh. Consider combining the static todo and the dynamic todo applications such that your application can store todos off line and sync them with the server when connected.


 - Static + dynamic Blog. The static blog loads page faster than the dynamic blog, but the dynamic blog is, well, dynamic. Consider what it would take to create an blog that renders a page file when it is requested the first time, but serves a statically generated page if it already exists.
