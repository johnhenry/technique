#Technique

This is a set of techniques that I've learned over the years while programming. Following these guidelines will allow you to easily create maintainable, scalable, and debuggable applications.

Many of the techniques rely on specific features of the JavaScript (ES6/2015), but don't let that discourage you! The concepts are widely applicable to other languages.

This document is split into two main parts: Part One focuses on a set of concepts while part two focuses on applications built with these concepts in mind.

###Quick note on performance
I focus on performance from a development perspective. Some features become will dramatically more performant as in the upcomming months as they become native to platform implementations and don't need to be transplied to work. Other aspects could be improved through caching and memoization.  

I chose React as a rendering platform because of it's stateful rendereing model -- it's a happy coincidence allows for efficient client-side rendereing.

##Part One. -- Concepts

###Functional Programming

Functional programming has many meanings, but we're going to go with the idea that you application is composed of _stateless_ _higher-order_ _functions_. Being _stateless_ means that invoking a function does not affect the anything outside of that function. It simply produces an output, and does not modify anything, not even the value(s) passed into it. Being _higher-order_ means that values passed into and returned from a function may also functions, in addition to other data types supported by the language.
(Note, many languages other than don't allow for higher order functions, but you can achieve a similar effect by attaching functions as methods to objects and passing those objects to and from functions.)

###Immutability

 Any values (variables), are declared at the beginning of functions/blocks in which they are used and not mutated. As variables are not mutated, all declarations should use either the 'const' or the 'import' keyword. Avoid user of 'let' and 'var'.

###Controller-Renderer Pattern

The main functionally of your application is encapsulated into two main types of components:

   - Controllers modify an application's state in response to _actions_, which come from the user (indirectly through the _view_) or some other source (a server, another controller, etc.) and send the updated state to a renderer.

   - Renderers accept an application's state and transform (or "render") it into something with which the user interacts (a _view_). This is usually in the form of a webpage or elements on a web page but abstractly could be anything including formatted data, audio files, or 3D printed objects.

####Basic Controller-Renderer Diagram

     [view] -(actions)-> [controller] -(state)-> [renderer] -> [view]

An application may be composed of any number of controllers and renderers, provided that they are connected via _one-way_ communication, as this will greatly simplify debugging. When there is _two-way_ communication between components, it should take place across two distinct channels with one channel carrying communication between two components on way and the other the other way.

Visusually, this:

```
[component A] <-
|               |
-> [component B]
```

is preferred over this:

```
[component A] <-> [component B]
```

Generally, functions are channels

###Componentization

  Each part of an application is composed of smaller, simpler components that may in turn be composed of even simpler components.

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
//messages-button.jsx
import React from 'react';
export const ClickButton = ({click, className}) =>
  <button className={className} onClick={click}>Click for message</button>
```
Note that we've passed in the _className_ attributes

```JavaScript
//messages.jsx
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
//application.js
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

####Styling

Using some of the newer features of CSS (provided by our build scripts), we can allow our styles to mirror the structure of our visual components. The following CSS maps directly to each component.

```css
/* file: button.css */
button{
  margin:8px;
}
```

```css
/* file: message-button.css */
@import './button.css';
.MessageButton{
  @extend: button;
  color:blue;
}
```

```css
/* file: message.css */
.Messages{
  padding:8px;
  @import './message-button.css';
}
```

```css
/* file: message-application.css */
body{
  margin:0px;
  padding:0px;
  @import './messages.css';
}
```


Avoiding css selectors and ids in favor of standard tag selectors, along with using nested css allows you to take advantage of the semantic web and create an application who's content does noes not depend upon code in the styles.

However; as demonstrated above, it's useful to attach a class corresponding the name of a rendered component to its top level component, especially if your component is ultimately composed of solely html.

This is not necessary when using custom web components, as those can be styled using their custom tag name.

Some are very much against using processors to expand nested CSS due to performance issues that may arise. It's entirely possible to avoid nesting all together, though you may lose some advantages:

```css
/* file: message-application-no-nesting.css */
@import './button.css';
body{
  margin:0px;
  padding:0px;
}
.Messages{
  padding:8px;
}
.Messages .MessageButton{
  @extend: button;
  color:blue;
}
```

###Anti-Patterns
JavaScript is an extremely flexible language. There are often several ways to do the same thing. Some ways are better than other and some features should be avoided entirely.

You should definitely *form your own option* as to _why_ the following patterns are bad and _why_ you should avoid them, but if you find yourself using any of them in your code, I advise you to think long and hard about refactoring your code to get rid of them.

####Mutable Variables

Avoiding mutation makes reasoning about your code easier. Mutation makes it difficult to find the source of bugs, and code can be optimised to run much faster Avoid any declarations that use 'var' or 'let'.

####Classes
  Classes may have their place in other languages, but here are supersceeded by more effective features.

  - Name Spacing: Some people use classes for name spacing, but you can use built-in objects for this, in additon to features such as _maps_ or _modules_.
  - Encapsulation: Encapsulation can be acheived using _modules_
  - Object Constructors : _stateless (highe-order) functions_ can act as factories to create objects.
  - Classical Inheritence : In my years of programming, I haven't been able to find a _good_ use case for inheritance. Some APIs make heavy use of it, but I feel like this is mostly just bad API design. If you find a good use case for it, feel free to use JavaScript classes, or  

Other features, such as hoisting, cause more confusion and are best avoided by refactoring your code.

Avoid hoisting an the temporal dead zone
  - Declare functions as you would any other value;
    ```JavaScript
    const greet = function(){
      //...
    };
    ```
    Declaring a function like this does not allow it to be hoisted. However, the scope in which it is defined is clear because of the 'const' keyword (which could be 'let' or 'var'). Further, declaring values like this reminds the coder that functions can be used just as any other value, including being passed to and returned from other functions.
    ```JavaScript
    function greet(){
      //...
    };
    ```
  Declaring a function like this allows it to be hoisted. This sort of declaration also makes a value's scope unclear as there is no 'var', 'let', or 'const' keyword. It's my advice to simply avoid this all together.

  - Declare all values before using them
  ```JavaScript
  const GREETING = "hello";
  const greet = function(name){
    return GREETING + ' ' + name;
  };
  console.log(greet('john'));
  ```
  as opposed to

  ```JavaScript
  const GREETING = "hello";
  console.log(greet('john'));
  function greet(name){
    return GREETING + ' ' + name;
  };
  ```
##Avoid "Phantom" Variables
Let's start off by saying, I don't _hate_ PHP, I but I do *absolutey abhore* its _extract_ function because it creates values without really showing where they come from that can lead to some tense debugging situations.

I've seen this used mostly to extract form variables from the previously visited page.

```php
<?php
  extract($_POST);
  echo "NAME = $name PASSWORD = $password";
?>
```

JavaScript doesn't have an equivalent, but there are a number of global values, like alert and Math included in standard library of a language.

```javascript
//file:./application.js
alert(Math.sin(0));
```

While this works it is not clear where the alert function and the Math object come from.

I encourage you to export any global objects used from other modules


```javascript
//file:./default_environment/window.js
export default window;
```

```javascript
//file:./default_environment/Math.js
export default Math;
```

```javascript
//file:./application.js
import window from './default_enviromnemt/window';
import Math from './default_enviromnemt/Math';
const alert = window.alert;
Math.sin(0);
```

At first glance, this seems only to serve to make simple applications more complicated. Admittedly, this might not have much of an impact on debugging, as there isn't usually much guess as to where globals come from from.


However; direct control over the values ads a interestg way to add/polyfill functionality into existing objects.

```javascript
//file:./default_environment/window-fetch.js
if(!window.fetch) window.fetch = function(){
  //... not implemented
}
export default window;
```

```javascript
//file:./default_environment/window-fetch-remote.js
var FETCH_POLYFILL_URL = '';
if(!window.fetch){
  var script = window.document.createElement( 'script' );
  script.type = 'text/javascript';
  script.src = FETCH_POLYFILL_URL;
  document.getElementsByTagName('head')[0].appendChild(script);
}
export default window;
```
Check [https://github.com/github/fetch]() for an actual implementation.

It also gives you the opportunity to easily replace global objexts for testing.

```javascript
//file:./default_environment/window-fake.js
var log = window.console.log.bind(window.console);
var w = {
  document : {

  },
  alert : log
  confirm : log,
  prompt : log,
};
export default w;
```

```javascript
//file:./application.js
import window from './default_enviromnemt/window-fake';
import Math from './default_enviromnemt/Math';
const alert = window.alert;
Math.sin(0);
```

In short, if an something in your code is not a [primative](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) or an [operator](https://developer.mozilla.org/en-US/docs/Glossary/Operator), it should have a clear declaration with using one of the keywords: import, const, var or let;  or it should be declared as a parameter in a function.
Node's [\_dirname](https://nodejs.org/api/globals.html#globals_direname) and  [\_filename](https://nodejs.org/api/globals.html#globals_filename) don't fit well into these classifications, so just use them as normally.



###Build Scripts

Many of the above features are from version of [JavaScript]() and [CSS]() that are not widely available in browsers. Thanks to [babel-core/register](), we have to jump through very few hoops in order to get these features working on the server, but the frontend is a whole different matter.

Most browsers will not currently work with my ahem, "future code", so I use build scripts to transpile it into code that has all of the desired features, but still works with most browsers.

###Browserify
I also use build scripts to allow me to [import npm packages into my browser code](). This allows me to use a unified package manager for both browser and sever code. [Bower]() can still be used to download scripts, but  

###Concatination and more
I also use scripts to concatinate, minify, and add source maps to the code.

Note: As technologies such as [HTTP/2](), JavaScript ES6 and CSS 4.0 become more prevalent, concatination will begin to hinder performance. However, this is a problem for me, because concatination is a necessity when using [Browserif]. Oh well, I guess we'll just cross that bridge when we get there...


##Part 2. -- Sample Applications

What's good telling you all of that without something to show for it?

After you've installing this repository with:

```bash
git clone /johnhenry/technique
cd technique
npm install

```

you'll can run each of these applications by running their respective build and (if necessary) server scripts. Check out the source and see how they each demonstrate the concepts above.


###Static Applications

These static applications are composed only of static pages. You _may_ be able to open them directly in a browser, but you'll likely need to run them on a static server. I encourage the use of [http-server]() for a number of reasons, but it may make sense to simply run the server for the dynamic <a href="#2-dynamic-todo">Todo application</a>, as it's already pointed to the appropriate directory.

###Todo <span id='2-static-todo'></span>

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
To add a todo, the user types interacts with the page (the view) by typing the box and clicking the "Add Todo" button. This sends an message (action) to the controller telling it to update the list of todos (the state). Once this is updated, it's given to the renderer to re-render the view.

####UsageDiagram

[view:html] -(actions:json)->
^  [controller] -(state:json)->
|    [renderer:React] ->
[view:html]


###Blog <span id='2-static-blog'></span>

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

[controller:You] -(state:documents) ->
  [renderer:scripts]->
    [view:static files]

###Usage

This is a standard static website. Just visit it and click the links.
Pages are statically generated with the build script, so in order to modify the blog, edit the files in the _data_ folder and re-run the build script.

####Usage Diagram
[view:browser] -(interactions:http-request)->
^  [network]...
|
|  ...[network] -(actions:http-request)->
|    [controller:server] -(state:static files)->
|
|  [network]...
|  ...[network] -(state:response[file])->
[view:browser]

###Dynamic Applications

###Todo <span id='2-dynamic-todo'></span>

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
Rather than the controller processing actions on the page, it passes them over the network to a second controller on the server. The server then interprets the action, modifies the state accordingly, renders the state across the network back to the original controller which then renders the state to the view.


####Usage Diagram

[view:html] -(actions:json)->
^  [controller:browser] -(actions:http request)->
|    [network]...
|
|    ...[network] -(actions:http request)->
|      [controller:server] -(state:json)->
|        [renderer:json] ->
|    [network]...
|
|    ...[network] -(state:response[json])->
|  [controller:browser] -(state:json)->
|    [renderer:React] ->
[view:html]

###Blog <span id='2-dynamic-blog'></span>

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

[view:browser] -(interactions:http-request)->
  [network]...

  ...[network] -(actions:http-request)->
    [controller:server] -(state:dynamic files)->

  [network]...
  ...[network] -(state:response[file])->
[view:browser]
