export default ({document, fetch, EventSource, messageType = 'message', headers = {"Content-type" : "application/json"} }) => {
  const connected = new Set();
  const subscribers = [];
  const sendToSubscribers = data => subscribers.forEach(
    subscriber => subscriber(data));
  const send = instruction => {
    return fetch('/',
      {
        method : 'post',
        headers,
        body : instruction
      }).then(response => {
        switch(response.status){
          //case 206:Partial + reload
          case 205:
            return response.json().then(json=>setTimeout(()=>{
              json.location ?
              document.location = json.location :
              document.reload();
            },json.wait));
            break;
          case 206:
          case 202:
              //Asynchronous response
              return response.json().then(json=>{
                if(json.location)
                setTimeout(()=>{
                  if(!connected.has(json.location)){
                    connected.add(json.location);
                    const source = new EventSource(json.location);
                    source.addEventListener(
                      'open',
                      () => console.log(`connection open at '${json.location}'`));
                    source.addEventListener(
                      'error',
                      event => {
                      console.log(`connection error: '${json.location}' `);
                    });
                    source.addEventListener(
                      'close',
                      event => {
                      connected.delete(json.location)
                      if (event.readyState === EventSource.CLOSED){
                        console.log(`connection closed: '${json.location}' `);
                      };
                    });
                    source.addEventListener(
                      'message',
                      event => sendToSubscribers(event.data));
                  }
                }, json.wait);
              })
          case 202:
            break;
          case 200:
            return response.text().then(sendToSubscribers);
            break;
        }
      });
  }
  return {
    subscribers,
    send
  };
};
