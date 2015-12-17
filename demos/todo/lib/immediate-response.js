var getMessage = (content, location, wait, refresh, sse, ws, rtc) =>
  refresh && (sse || ws || rtc) ? `Refresh${ wait ? ` after ${ wait }ms` : ``} or connect to '${ location }'.`
  : refresh   ? `Refresh${ wait ? ` after ${ wait }ms` : ``}.`
  : sse ? `Connect to '${ location || `/`}'${ wait ? ` after ${ wait }ms` : ``} and await '${ sse === true ? `data` : sse }' event.`
  : ws || rtc || location.substr(0,3) === 'ws:' || location.substr(0,4) === 'wss:' ? `Connect to '${ location || `/`}'${ wait ? ` after ${ wait }ms` : ``}.`
  : location ? `Resource available at: '${ location }'${ wait ? ` after ${ wait }ms` : ``}.`
  : content === `` ? `No Content`
  : ``;
var getStatus = (content, location, refresh, sse, ws, rtc) => content ? 206
  : refresh ? 205
  : location || sse || ws || rtc ? 202
  : 204;
var responde = ({
  content   = ``,
  location  = ``,
  wait      = 0,
  redirect  = false,
  full      = true,
  refresh   = false,
  sse       = false,
  ws        = false,
  rtc       = false
} = {
  content   : ``,
  location  : ``,
  wait      : 0,
  redirect  : false,
  full      : true,
  refresh   : false,
  sse       : false,
  ws        : false,
  rtc       : false
}) => {
  if(full) return {status : 200, content};
  if(redirect && location) return {status : 303, content : location};
  const status = getStatus(content, location, refresh, sse, ws, rtc);
  if(status === 204) return {status};
  const message = getMessage(content, location, wait, redirect, full, refresh, sse, ws, rtc);
  if(!message) return {status:200, content};
  const result = {status, message};
  if(location) result.location = location;
  if(content !== '') result.content = content;
  if(wait) result.wait = wait;
  return result;
};
export default responde;
