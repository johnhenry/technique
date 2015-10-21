import React from 'react';
import ReactDOMServer from 'react-dom/server';
import IndexPage from './components/index-page.js';
var render = data => '<!doctype html>' + ReactDOMServer.renderToStaticMarkup(<IndexPage {...data} />);
export default render;
