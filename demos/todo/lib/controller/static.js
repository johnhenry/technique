export default({state, getUpdate})=>{
  const subscribers = [];
  const send = instruction => {
    return state.get()
      .then(currentstate => {
        return getUpdate(instruction)
        .then(update => {
          return state.set(update(currentstate))
          .then(data => {
            return subscribers.forEach(subscriber => subscriber(data))
          })})
        });
  }
  return{
    send,
    subscribers
  }
}
