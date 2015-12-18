export default (initialState) => {
  var internalState = initialState;
  return {
    __proto__ : undefined,
    get : (context) => Promise.resolve(internalState),
    set : (newState, context) => Promise.resolve(internalState = newState)
  }
}
