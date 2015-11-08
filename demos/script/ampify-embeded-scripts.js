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
