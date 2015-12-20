//Step 1 : Build Environment
import document from '../lib/window/document';
import localStorage from '../lib/window/localStorage';
import createView from '../lib/react-renderer';
import createController from '../lib/controller/static';
import stateManager from '../lib/state-manager/local-storage';
import getUpdate from '../lib/get-update';
import viewDefinition from '../lib/component/client.jsx';
import {BASESTATE, INITIALINSTRUCTION} from '../settings';
const baseState = localStorage.getItem('key') ? JSON.parse(localStorage.getItem('key')) : BASESTATE;
//Step 2 : Create Components
const controller = createController({
  state : stateManager(baseState),
  getUpdate : getUpdate
});
const view = createView({
  target  : document.getElementsByTagName('div')[0],
  viewDefinition : viewDefinition
  });
//Step 3 : Connect Components
controller.subscribers.push(view.send);
view.subscribers.push(controller.send);
//Step 4 : Initialize
controller.send(INITIALINSTRUCTION);
