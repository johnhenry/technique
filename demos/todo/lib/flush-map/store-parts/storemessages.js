export default function(address, payload){
  const map = this;
  return new Promise((resolve, reject)=>{
      if(map.has(address)) return resolve(map.get(address).push(payload));
      return resolve(map.set(address, [payload]));
  })
};
