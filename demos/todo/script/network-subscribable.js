import window from '../lib/window';
import document from '../lib/window/document';
import EventSource from '../lib/window/EventSource';
import fetch from '../lib/window/fetch';
import prompt from '../lib/window/prompt';
import createView   from '../lib/react-renderer';
import getNetwork from '../lib/controller/network';
import {INITIALINSTRUCTION} from '../settings';
import component from '../lib/component/index.jsx';
const SSEID = prompt('SSEID?') || 'SSEID';
const network = getNetwork({
  fetch,
  EventSource,
  document,
  messageType : 'message',
  headers : {"Content-type" : "application/json", 'X-SSEID' : SSEID}
});
const view = createView({
  target  : document.getElementsByTagName('div')[0],
  elementDefinition : component
  });
network.subscribers.push(input => view.send(JSON.parse(input)));
view.subscribers.push(input => network.send(JSON.stringify(input)));
network.send(JSON.stringify(INITIALINSTRUCTION));
