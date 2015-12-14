/**
  @description ???
  @param {object} : context Request context
  @returns @function
  @description Generate JSON HTTP response (side effect)
    @param {object} state
    @return {undefined}
 */
export default context => state => {
  context.type = 'application/json';
  context.status = 200;
  context.body = state;
  return state;
};
