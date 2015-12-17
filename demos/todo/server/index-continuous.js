import {SERVER}   from '../settings';
import path       from 'path';
import koa        from 'koa';
import koaStatic  from 'koa-static';
import jsonBody   from 'koa-json-body';
import BASESTATE  from '../lib/BASESTATE';
import state      from '../lib/state';
import controller from '../controller/todo-continuous';
import JSON       from '../lib/JSON';
koa()
  .use(koaStatic(path.resolve(__dirname , SERVER.STATICDIR)))
  .use(jsonBody({ limit: '10kb' }))
  .use(controller(state(BASESTATE)))
  .listen(
    SERVER.PORT,
    () => console.log(
`Listening on Port: ${SERVER.PORT}
SERVER SETTINGS:
${JSON.stringify(SERVER, undefined, 2)}
`));
