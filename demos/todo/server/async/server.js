//Step 1 : Build Environment
import path from 'path';
import koa from 'koa';
import koaStatic from 'koa-static';
import jsonBody from 'koa-json-body';
import {SERVER, BASESTATE} from '../../settings';
import stateManager from '../../lib/state-manager';
import asyncController from '../../lib/controller/asynchronous';
import getUpdate  from '../../lib/get-update';
import getRenderer from '../response';
//Step 2 : Create Components
const controller = asyncController({
  state:stateManager(BASESTATE),
  getUpdate:getUpdate,
  getRenderer:getRenderer
});
//Step 3 : Connect Components & Initialize
koa()
  .use(koaStatic(path.resolve(__dirname , SERVER.STATICDIR)))
  .use(jsonBody({ limit: '10kb' }))
  .use(controller)
  .listen(
    SERVER.PORT,
    () => console.log(
`Listening on Port: ${SERVER.PORT}
SERVER SETTINGS:
${JSON.stringify(SERVER, undefined, 2)}
`));
