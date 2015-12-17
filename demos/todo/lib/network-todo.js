import EventSource from './window/EventSource';
import fetch from './window/fetch';
import JSON from './JSON';
export default (SSEID = undefined, messageType ='message') => {
  const connected = new Set();
  const subscribers = [];
  const sendToSubscribers = data => subscribers.forEach(
    subscriber => subscriber(data));
  const headers = {"Content-type" : "application/json"};
    if(SSEID !== undefined) headers["X-SSEID"] = SSEID;
    const send = instruction => fetch('/', {
      method:'post',
      headers,
      body : instruction}).then(response => {
        switch(response.status){
          case 202:
              //Asynchronous response
              return response.json().then(json=>{
                setTimeout(()=>{
                  if(!connected.has(json.location)){
                    connected.add(json.location);
                    const source = new EventSource(json.location);
                    source.addEventListener('open', () => console.log(`connection open at '${json.location}' `));
                    source.addEventListener('error', (event) => {
                      console.log(`connection error: '${json.location}' `);
                    });
                    source.addEventListener('close', (event) => {
                      connected.delete(json.location)
                      if (event.readyState === EventSource.CLOSED){
                        console.log(`connection closed: '${json.location}' `);
                      };
                    });
                    source.addEventListener(
                      'message',
                      event => sendToSubscribers(JSON.parse(event.data)));
                    source.addEventListener(
                      'message',
                      event => sendToSubscribers(JSON.parse(event.data)));
                  }
                }, json.wait);
              })
            break;
          case 200:
            return response.json().then(sendToSubscribers);
            break;
        }
      });
      return {
        subscribers,
        send
      };
  };
