import document from '../lib/window/document';
import fetch from '../lib/window/fetch';
import EventSource from '../lib/window/EventSource';
import createController from '../lib/controller/static';
import getNetwork from '../lib/controller/network';
import state from '../lib/state';
import getUpdate from '../lib/get-update';
import {BASESTATE, INITIALINSTRUCTION} from '../settings';
import createRenderer   from '../lib/renderer/dom/index.jsx';
const controller = createController({
  state : state(BASESTATE),
  getUpdate : getUpdate
});
const network = getNetwork({
  fetch,
  EventSource,
  document,
  messageType : 'message',
  headers : {"Content-type" : "application/json"}
});
const view = createRenderer(document.getElementsByTagName('div')[0]);
controller.subscribers.push(view.send);
network.subscribers.push(input => view.send(JSON.parse(input)));
view.subscribers.push(controller.send);
view.subscribers.push(input => network.send(JSON.stringify(input)));
network.send(JSON.stringify(INITIALINSTRUCTION));
