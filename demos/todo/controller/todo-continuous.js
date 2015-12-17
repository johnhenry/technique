import getUpdate from '../lib/get-update';
import getRenderer from '../lib/get-renderer';
import immediateResponse from '../lib/immediate-response';//Respond Immediately
import sse from '../lib/channel/sse';//register SSE Listiners
import createStore from '../lib/create-store';//create store
const match = new RegExp('/([A-z0-9]+)');
export default function(state){
  const channels = new Map();
  const store = createStore(new Map());
  const postInChannels = (address, payload) => store.post(channels, address, payload);
  return function * (next){
    let context = this;
    if(context.request.method === 'POST'){
      //Immediate Data Request
      const response = immediateResponse({
        full : false,
        location : `/${context.request.header['x-sseid']}`,
        sse : true});
      context.response.status = response.status;
      context.body = response;
      //Response Ended, but processing continues...
      const current = yield state.get(this);
      const render = yield getRenderer(this);
      const address = context.request.header['x-sseid'];
      const postToAddress = payload => postInChannels(address, payload);
      if(!(this.request.body && this.request.body.type)){
        //No Body in Request -> send current state to message queue
        return postToAddress({event : `message`, id : 0, message : current});
      }else{
        //Body in Request -> modify state according to body send to messege queue
        const update = yield getUpdate(context.request.body);
        state.get().then(update).then(state.set)
        .then(current=>postToAddress({event:`message`, id:0, message:current}));
      }
    }else if(
      context.request.method === 'GET'
      && context.headers['accept'] === 'text/event-stream'
      && match.test(context.request.path)){
        const address = match.exec(context.request.path)[1];
        return sse({
          request  : context.req,
          response : context.res,
          address  : address,
          channels : channels,
          retry    : 1000
        }).then(channel => store.flush(address).then(channel.send))
        .catch(console.error.bind(console))
    }else {
      yield next;
    }
  }
};
