//Step 1 : Build Environment
import window from '../lib/window';
import document from '../lib/window/document';
import EventSource from '../lib/window/EventSource';
import fetch from '../lib/window/fetch';
import prompt from '../lib/window/prompt';
import createView   from '../lib/react-renderer';
import getNetwork from '../lib/controller/network';
import {INITIALINSTRUCTION} from '../settings';
import viewDefinition from '../lib/component/index.jsx';
//Step 1.1 Get User Input
const SSEID = prompt('SSEID?') || 'SSEID';
//Step 2 : Create Components
const network = getNetwork({
  fetch,
  EventSource,
  document,
  messageType : 'message',
  headers : {"Content-type" : "application/json", 'X-SSEID' : SSEID}
});
const view = createView({
  target  : document.getElementsByTagName('div')[0],
  viewDefinition : viewDefinition
  });
//Step 3 : Connect Components
network.subscribers.push(input => view.send(JSON.parse(input)));
view.subscribers.push(input => network.send(JSON.stringify(input)));
//Step 4 : Initialize
network.send(JSON.stringify(INITIALINSTRUCTION));
