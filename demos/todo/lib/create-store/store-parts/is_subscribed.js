export default (address, channels) => {
    return new Promise((resolve, reject)=>{
      if(channels.has(address)) return resolve(channels.get(address));
      reject(new Error(`Address not found: ${address})`));
    })
};
