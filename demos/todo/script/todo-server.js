import document from '../lib/window/document';
import JSON from '../lib/JSON';
import createRenderer from '../renderer/dom/todo-static.jsx';
import getNetwork from '../lib/network-todo';
import createController from '../controller/todo-static.js';
import state from '../lib/state';
import BASESTATE from '../lib/BASESTATE';
import INITIALINSTRUCTION from '../lib/INITIALINSTRUCTION';//network
const controller = createController(state(BASESTATE));
const network = getNetwork();
const view = createRenderer(document.getElementsByTagName('div')[0]);
controller.subscribers.push(view.send);
network.subscribers.push(view.send);
view.subscribers.push(controller.send);
view.subscribers.push(input => network.send(JSON.stringify(input)));
network.send(JSON.stringify(INITIALINSTRUCTION));
