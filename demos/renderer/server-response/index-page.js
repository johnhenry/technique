import React from 'react';
import ReactDOMServer from 'react-dom/server';
import IndexPage from '../../component/index-page';
import {injectStyle} from '../../script/inject-html';
import {CLIENT}   from '../../settings';
export default context => state => {
  var body = '<!doctype html>' + ReactDOMServer.renderToStaticMarkup(<IndexPage index={state.index} posts={state.posts} />);
  body = injectStyle.apply(undefined, CLIENT.STYLES)(body);
  context.type = 'text/html';
  context.status = 200;
  context.body = body;
  return state;
};
