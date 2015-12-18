export const subscribe = (send, subscribers) => subscribers.push(send);
export const unsubscribe = (send, subscribers = []) => {
  const index = subscribers.indexOf(send);
  return  index > -1 ?  subscribers.splice(index, 1) : undefined;
}
export const subscribeMultiple = (send, subscribersList = []) =>
subscribersList.forEach(subscribers=>subscribers.push(send));

export const broadcast = (payload, subscribers = []) => subscribers
.forEach(subscriber=>subscriber(payload));
