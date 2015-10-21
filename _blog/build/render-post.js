import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PostPage from './components/post-page.js';
var render = data => '<!doctype html>' + ReactDOMServer.renderToStaticMarkup(<PostPage {...data} />);
export default render;
