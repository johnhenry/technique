import {SERVER}   from '../settings';
import path       from 'path';
import koa        from 'koa';
import koaStatic  from 'koa-static';
import Router     from 'koa-router';
import controller from './controller.dynamic';
import requestTypeParser from './request-type-parser';
var router = new Router();
koa()
  .use(koaStatic(path.resolve(__dirname , SERVER.STATICDIR)))
  .use(requestTypeParser)
  .use(controller)
  .listen(
    SERVER.PORT,
    () => console.log(
`Listening on Port: ${SERVER.PORT}
SERVER SETTINGS:
${JSON.stringify(SERVER, undefined, 2)}
`));
