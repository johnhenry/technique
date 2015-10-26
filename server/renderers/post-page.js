import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PostPage from '../../_blog/build/components/post-page.js';
import {injectStyle} from '../../_client/build/inject-html';
import {CLIENT}   from '../../settings';
export default context => state => {
  var body = '<!doctype html>' +  ReactDOMServer.renderToStaticMarkup(<PostPage post={state.post} />);
  body = injectStyle.apply(undefined, CLIENT.STYLES.map(s=> '../' + s))(body);
  context.type = 'text/html';
  context.status = 200;
  context.body = body;
  return state;
};
