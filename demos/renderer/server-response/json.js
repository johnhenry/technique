export default context => state => {
  context.type = 'application/json';
  context.status = 200;
  context.body = state;
  return state;
};
