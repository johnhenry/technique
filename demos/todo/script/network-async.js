import document from '../lib/window/document';
import EventSource from '../lib/window/EventSource';
import fetch from '../lib/window/fetch';
import createView   from '../lib/react-renderer';
import createController from '../lib/controller/static';
import getNetwork from '../lib/controller/network';
import state from '../lib/state';
import getUpdate from '../lib/get-update';
import {BASESTATE, INITIALINSTRUCTION} from '../settings';
import component from '../lib/component/index.jsx';
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
const view = createView({
  target  : document.getElementsByTagName('div')[0],
  elementDefinition : component
  });controller.subscribers.push(view.send);
network.subscribers.push(input => view.send(JSON.parse(input)));
view.subscribers.push(controller.send);
view.subscribers.push(input => network.send(JSON.stringify(input)));
network.send(JSON.stringify(INITIALINSTRUCTION));
