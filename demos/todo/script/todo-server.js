import document from '../lib/window/document';
import {send, subscriptions} from '../controller/todo-server.js';
import createRenderer from '../renderer/dom/todo-static.jsx';
const view = createRenderer(document.getElementsByTagName('div')[0]);
subscriptions.push(view.render);
view.subscriptions.push(send);
send();
