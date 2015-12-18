const createWSChannel = (socket, proto = undefined) => {
  const subscribers = [];
  socket.onmessage = data => subscribers.forEach(subscriber => subscriber(data));
  return {
    __proto__ : socket,
    subscribers
  };
};
export default = ({socket, address, channels, store}) => {
  const channel = createWSChannel(socket);
  channels.set(address, channel);
  socket.on('close', () => {
    channel.close();
    channels.delete(address)
  });
  return Promise.resolve(channel);
};
