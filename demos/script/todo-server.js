import {send, subscriptions} from '../controller/todo-server.js';
import {render, subscriptions as viewSubscriptions} from '../renderer/dom/todo-static.js';
import window from './window';
const document = window.document;
const renderTarget = document.getElementsByTagName('div')[0];
subscriptions.push(render(renderTarget))
viewSubscriptions.push(send);
send();
