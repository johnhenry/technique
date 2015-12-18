import storemessages from './storemessages';
export default function(address, payload, channels, filter){
  const map = this;
  if(typeof filter === 'function' && !filter(payload)) return Promise.reject(new Error(`Payload not acceptable: ${payload})`));
  return storemessages.bind(map)(address, payload);
};
