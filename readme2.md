#Technique

This is a set of techniques that I've learned over the years for creating maintainable, scalable applications using JavaScript (ES6/2015). While the concepts may be applicable to other languages, many rely on specific features of the JavaScripts.

##Concepts

###Convention Over Configuration

These techniques


###Library Independence

###Stateless Functional Programming

Functional programming has many meanings, but we're going to go with this idea:
  - You application should be composed primarily of functions.
  - Each function has a well defined specific purpose
  - When a function is called, it should not affect the rest of the application -- it simply accepts input and produces an output without modifying anything outside of the function itself.
  - Functions should be grouped into modules
  -

Doing this allows you to modify parts of your code without affecting other parts. Try to have each function take no more than a single parameter. Also try to limit the exports of a module to a single function. This will help you keep each module simple and easily modifiable. Of course there are exceptions, as when functions are very closely related. Use your discression here.


This is exemplified in what I call the *Controller-Renderer* paradignm in which every application is broken down into two types of components:
   - *Controllers* modify an application's state in response to _actions_, which come (indirectly) from the user or some other source (a server, another controller, etc) and send the updated state to a renderer.
   - *Renderers* accept an application's state and transform ("render") it into a final form with which the user may interact. This is usually in the form of a webpage or elements on a web page (a _view_) but abstractly could be anything including audio files or 3D printed objects.

In this paragidm,

###Avoiding "Bad Parts"
JavaScript is a language with many many features -- not all of which are needed, and some of which will actually impare the language's usefulness.

Avoid Classes -
  - Name spacing provided by Classes in other languages can be achieved more easily using JavaScript Objects, Maps, and/or modules.
  - Encapsulation can be achieved using modules.
  - Classical inheritence is [generally not useful]()

Avoid hoisting an the temporal dead zone
  - Declare all values before using them
    ```JavaScript
      var 5
    ```

  - Declare functions as you would any other value;

    ```JavaScript
    const func = function(){
      //...
    }
    ```
    as opposed to
    ```JavaScript
    function func(){
      //...
    }
    ```

Avoid global when possible
  - Export global values from an external file.

    ```JavaScript
      //window.js
      export window;
      //index.js
      import window from './window';
      window.alert();
      window.document;
      window.console.log("")
    ```

   This may seem silly, but it can make debugging much easier by allowing you to easily inject stubs.

   ```JavaScript
     //window.js
     export window;
     //index.js
     import window from './window-stub';
     //...
   ```

Read JavaScript the Good Parts

###Build Scripts
