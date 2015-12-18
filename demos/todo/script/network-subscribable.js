import window from '../lib/window';
import document from '../lib/window/document';
import fetch from '../lib/window/fetch';
import EventSource from '../lib/window/EventSource';
import prompt from '../lib/window/prompt';
import getNetwork from '../lib/controller/network';
import {INITIALINSTRUCTION} from '../settings';
import createRenderer   from '../lib/renderer/dom/index.jsx';
const SSEID = prompt('SSEID?') || 'SSEID';
const view = createRenderer(document.getElementsByTagName('div')[0]);
const network = getNetwork({
  fetch,
  EventSource,
  document,
  messageType : 'message',
  headers : {"Content-type" : "application/json", 'X-SSEID' : SSEID}
});
network.subscribers.push(input => view.send(JSON.parse(input)));
view.subscribers.push(input => network.send(JSON.stringify(input)));
network.send(JSON.stringify(INITIALINSTRUCTION));
