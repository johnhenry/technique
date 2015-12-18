export default function(address, remove = true){
  const map = this;
  const messages = !map.has(address) ? [] : map.get(address);
  if(remove) map.delete(address);
  return Promise.resolve(messages);
};
