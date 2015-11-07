import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Index from '../../component/index';
var render = data => '<!doctype html>' +  ReactDOMServer.renderToStaticMarkup(<Index />);
export default render;
