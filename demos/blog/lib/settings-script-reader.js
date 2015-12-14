export default s => {
  const obj = {type:'style'};
  if(typeof s === 'string'){
    obj.source = s;
    if(s.substring(s.lastIndexOf('.')) === '.css') return obj;
    obj.type = 'script';
    return obj;
  }
  obj.source = s.style;
  if(s.style) return obj;
  obj.type = 'script';
  obj.source = s.script;
  if(s.async) obj.async = true;
  if(s.defer) obj.defer = true;
  return obj;
}
