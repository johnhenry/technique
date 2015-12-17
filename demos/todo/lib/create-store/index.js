import flush from './store-parts/flush';
import post from './store-parts/post';
const storeFactory = (map = new WeakMap()) => {
  return {
    __proto__ : map,
    flush     : flush.bind(map),
    post      : post.bind(map)
  }
}
export default storeFactory;

// /*
//   store.flush - get retreive all messages for a given address and flush them from the system.
//     address:* - ownner of messages
//     store:store
//
// */
// const is_subscribed = (address, channels) => {
//     return new Promise((resolve, reject)=>{
//       if(channels.has(address)) return resolve(channels(address));
//       reject(new Error(`Address not found: ${address})`);
//     })
// };
// const storeFactory = (innerstore = new WeakMap(), proto = undefined) = {
//   const storemessage = (address, payload){
//     return new Promise((resolve, reject)=>{
//         if(innerstore.has(address)) return resolve(innerstore.get(address).push(payload)));
//         return resolve(innerstore.set(address, [message]));
//     })
//   };
//   const flush = (address, remove = true) => {
//     const messages = !innerstore.has(address) ? [] : innerstore.get(address);
//     if(remove) innerstore.delete(address);
//     return Promise.resolve(messages);
//   };
//   const post = function(channels, address, payload, filter){
//     if(typeof filter === 'function' && !filter(payload))) return Promise.reject(new Error(`Payload not acceptable: ${payload})`);
//     return is_subscribed(address, channels)
//       .then(channel=>
//         flush(address).then(messages =>
//           channel.send(messages.concat(payload))))
//       .catch(address=>storemessage(address, payload));
//   };
//   return {
//     __proto__ : undefined,
//     flush,
//     post
//   }
// }
