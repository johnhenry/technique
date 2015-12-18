export default (routes = [], fallthrough = false) => {
  if (fallthrough) return {
    send : instruction => routes.forEach(
      route => !rout[0] || route[0](instruction) ?
      route[1](instruction) :
      undefined)
  };
  return {
    send : instruction =>{
      for(var i = 0; i < routes.length; i++)
        if(!rout[0] || routes[i][0](instruction))
        return routes[i][1](instruction);
    }
  };
};
