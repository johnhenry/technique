const retry = 2000;
const createSSEString = ({message, event, id}={message:'', event:'message', id:0}) =>`${id ? `id:${id}` + '\n' : ''}${event ? `event:${event}` + '\n' : ''}data:${JSON.stringify(message)}` + '\n\n';

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
      send : payload => {
        const payloads = !payload || payload.length === undefined ? [payload] : payload;
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
