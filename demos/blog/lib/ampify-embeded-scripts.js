/**
  @description Set "amp" flag on pre-attached/pre-embedded styles
  @param {string} |
  {
    {string} source = false,
    {boolean} [amp = false],
    {boolean} [style = false]
  } s String or object
  @returns Object
 */
export default s => {
  if(typeof s === 'string'){
    if(s.substring(s.lastIndexOf('.')) !== '.css') return false;
    return {'style':s, amp:true};
  }
  if(!s.style) return false;
  obj.source = s.style;
  obj.amp = true;
  return obj;
}
