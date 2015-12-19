import document         from '../lib/window/document';
import createView   from '../lib/react-renderer';
import createController from '../lib/controller/static';
import state     from '../lib/state';
import getUpdate from '../lib/get-update';
import component from '../lib/component/index.jsx';
import {BASESTATE, INITIALINSTRUCTION} from '../settings';
const controller = createController({
  state : state(BASESTATE),
  getUpdate : getUpdate
});
const view = createView({
  target  : document.getElementsByTagName('div')[0],
  elementDefinition : component
  });
controller.subscribers.push(view.send);
view.subscribers.push(controller.send);
controller.send(INITIALINSTRUCTION);
