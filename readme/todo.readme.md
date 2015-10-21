#Todo

Todo Sever is similar to Todo Static, with the addition that it connects to a server api.
We'll first learn how to build a server using similar techniques.

The abstract purpose of this application remains the same : the *controller*  _controls_ the *state* and the *renderer*  _renders_ it.

A few things change on the server, however:


##Controller
Rather than receiving actions from a view, the server controller will respond directly to actions in the form of HTTP requests.

We'll be using [koa]() as the basis of our controller, but the concepts to

Koa sends any incoming requests to it's middleware. Thus, rather than having to subscribe the onAction
function to the view, we'll simple structure the _onAction_ function as koa middleware


```JavaScript

var onAction = function * (){
  var action = this;
  if(typeof actionDictionary[action.type] === 'function'){
    var update = actionDictionary[action.type](action.payload)
    state = update(state);
    render(state);
  }
```

Notice that the above example doesn't not include a source for the _state_ object nor the _render_ function, nor the command dictionary, from which we produce the _update_ command.

Because HTTP is a stateless protocol, we'll to use the _request_ to fetch the state from a persistent storage.
Similarly, we'll use the fetch a render function based on the request, as well as to fetch an update function in place of



```JavaScript
//file:controller.js
import getState from './get-state';
import getRender from './get-render';
import getUpdate from './get-update';

var onAction = function*(){
    var [state, render, update] = yield Promise.all(getState(this), getRender(this), getUpdate(this), );
    update(state).then(render);
};
export default onAction;
```






```JavaScript


};

```


##State
HTTP requests are stateless, so there must be some mechanism to update and retrieve desired parts of some application state based on the request that the user makes.


##Renderer
The renderer handles responding to your request. We could bake this into the mechanism that retrieves state, but I'll separate this, and retieve the
