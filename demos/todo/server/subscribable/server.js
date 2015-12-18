import path       from 'path';
import koa        from 'koa';
import koaStatic  from 'koa-static';
import jsonBody   from 'koa-json-body';
import {SERVER, BASESTATE} from '../../settings';
import state      from '../../lib/state';
import createController from '../../lib/controller/subscribable';
import getUpdate  from '../../lib/get-update';
import createStore from '../../lib/flush-map';
import getRenderer from '../../lib/renderer/response';
const controller = createController({
  state       : state(BASESTATE),
  getUpdate   : getUpdate,
  getRenderer : getRenderer,
  channelmap  : new Map(),
  storemap    : createStore(new Map())
});
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
