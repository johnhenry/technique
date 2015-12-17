import is_subscribed from './is_subscribed';
import storemessages from './storemessages';
import flush from './flush';
export default function(channels, address, payload, filter){
  const map = this;
  if(typeof filter === 'function' && !filter(payload)) return Promise.reject(new Error(`Payload not acceptable: ${payload})`));
  return is_subscribed(address, channels)
    .then(channel=>{
      flush.bind(map)(address).then(messages=>channel.send(messages.concat(payload)))})
    .catch(error=>storemessages.bind(map)(address, payload));
};
