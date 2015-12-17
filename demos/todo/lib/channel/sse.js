const retry = 2000;
import JSON from '../JSON';
const createSSEString = ({message, event, id}) =>`${id ? `id:${id}` + '\n' : ''}${event ? `event:${event}` + '\n' : ''}data:${JSON.stringify(message)}` + '\n\n';

const initSSE = (response, retry = retry) => {
  response.writeHead(200, {
    'Content-Type' : 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection'   : 'keep-alive'
  });
  response.write('\n');
  response.write(`retry:${retry}`);
  response.write('\n\n');
  return response;
}
const createSSEChannel = (response, retry) =>{
  initSSE(response, retry);
  const channel = {
      __proto__: response,
      send : payloads => {
        const message = payloads.map(createSSEString).join('');
        if(message) response.write(message);
        return channel;
      },
      close : response.end
  }
  return channel;
};
export default ({request, response, address, channels, retry}) =>{
  const channel = createSSEChannel(response, retry);
  channels.set(address, channel);
  request.on('close', () => {
    channel.close();
    channels.delete(address);
  });
  return Promise.resolve(channel);
};
