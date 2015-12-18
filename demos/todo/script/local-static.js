import document         from '../lib/window/document';
import createRenderer   from '../lib/renderer/dom/index.jsx';
import createController from '../lib/controller/static';
import state     from '../lib/state';
import getUpdate from '../lib/get-update';
import {BASESTATE, INITIALINSTRUCTION} from '../settings';
const controller = createController({
  state : state(BASESTATE),
  getUpdate : getUpdate
});
const view = createRenderer(document.getElementsByTagName('div')[0]);
controller.subscribers.push(view.send);
view.subscribers.push(controller.send);
controller.send(INITIALINSTRUCTION);
