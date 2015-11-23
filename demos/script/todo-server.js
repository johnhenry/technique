import {subscribe, send} from '../controller/todo-server.js';
import window from './window';
import {render, subscribe as subscribeAction} from '../renderer/dom/todo-static.js';
const document = window.document;
const renderTarget = document.getElementsByTagName('div')[0];
subscribeAction(send);
subscribe(render(renderTarget));
send();
