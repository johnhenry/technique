//Step 1 : Build Environment
import document from '../lib/window/document';
import EventSource from '../lib/window/EventSource';
import fetch from '../lib/window/fetch';
import createView from '../lib/react-renderer';
import createController from '../lib/controller/static';
import getNetwork from '../lib/controller/network';
import stateManager from '../lib/state-manager';
import getUpdate from '../lib/get-update';
import {BASESTATE, INITIALINSTRUCTION} from '../settings';
import viewDefinition from '../lib/component/index.jsx';
//Step 2 : Create Components
const controller = createController({
  state : stateManager(BASESTATE),
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
  viewDefinition : viewDefinition
  });controller.subscribers.push(view.send);
//Step 3 : Connect Components
network.subscribers.push(input => view.send(JSON.parse(input)));
view.subscribers.push(controller.send);
view.subscribers.push(input => network.send(JSON.stringify(input)));
//Step 4 : Initialize
network.send(JSON.stringify(INITIALINSTRUCTION));
