#Application Application

##Subscribable vs EventListener vs Observable

###Event Dispatcher
An EventDispatcher exposes one main functions :

  - EventDispatcher#addEventListener(name:string, listener:function)
Internally, the EventDispatcher has a collection of event names, each connected to collection of EventListener. Dispatching an event consist of finding the collection of listeners associated with its name, and then running each function in this collection on the event.
This function simply adds the listener function to this internal collection.

An EventDispatcher may also expose secondary functions :
  - EventDispatcher#removeEventListener(name:string, listener:function) -- remove listener function from internal collection.
  - EventDispatcher#removeAll(name:string) -- all remove listeners to a specific event from internal collection.

###Obserbable
An EventDispatcher exposes one main functions :

  - Obserbable#observe(observer:function)
This returns another observable that dispatches an event to the given observer.

Observables that are results of calling the above function have a secondary function:
  - Obserbable#dispose()
This causes the observer function to no longer be called.

###Exposed Listener Collection
Rather than using methods, why not simply expose the collection of listeners?
 - Subscribable#subscribers<string, function>

A subscribable has a collections of listeners known as  subscribers

Adding events and removing events can be done quite easily, as they would be with any array:

```javascript
    const Subscribable = {
      subscribers:{}
    }
    //Add Event
    const eventName = 'open';
    const subscriber = event => console.log(event);
    if(!EventDispatcher.subscribers[eventName]) Subscribable.subscribers[eventName] = []; Subscribable.subscribers[eventName].push(logevent);
    //Remove Event
    const index = Subscribable.subscribers[eventName].indexOf(subscriber);
    if(index > -1) Subscribable.subscribers[eventName].splice(index, 1);
    //Remove All Listeners
    delete Subscribable.subscribers[eventName];
```

Direct access to the collection can provide additional insight into your program


```javascript
    //How many listeners do I have for a specific event?
    Subscribable.subscribers[eventName] ? Subscribable.subscribers[eventName].length :
    0;
    //Will is a specific function already attached as an event?
    Subscribable.subscribers.includes[eventName](subscriber);
```

This also affords the opportunity to act upon the away from the original object

```javascript
  import listenerManager  from 'listener-manager';
  const subscribers = Subscribable.subscribers;
  listenerManager.manage(subscribers);
```



##Client Layer
The application layer consist of static files available to the user from a server.


##Data Layer

###Request/Response
For simplicity, a client can make request to a server
x
###Subscription

###Real Time

#F.A.Q.

Because we're using the POST method to request data, requests for data cannot be cached. If I need to cache a data request, can I set up a system that reads url parameters from a GET request instead?


Yes, but there are a number of reason to avoid this:
