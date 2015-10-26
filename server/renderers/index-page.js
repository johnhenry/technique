import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from '../../../_blog/build/components/index-page.js';

export default context => state => {
  context.type = 'text/html';
  context.status = 200;
  context.body = '<!doctype html>' +  ReactDOMServer.renderToStaticMarkup(<IndexPage index={state.index} posts={state.posts} />);
  return state;
};
