/**
  @description Clone an object
  @param {object} Object to be cloned
  @returns Object Cloned object
 */
export default object => {return JSON.parse(JSON.stringify(object))};
