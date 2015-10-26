import React from 'react';
import ReactDOM from 'react-dom';
import PostPage from '../../../_blog/build/components/post-page.js';

export default context => state => {
    context.type = 'text/html';
    context.status = 200;
    context.body = '<!doctype html>' +  ReactDOMServer.renderToStaticMarkup(<PostPage post={state.post} />);
    return state;
};
