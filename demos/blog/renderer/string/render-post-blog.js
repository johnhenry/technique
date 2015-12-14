import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PostPage from '../../component/blog-post';
import embed  from '../../lib/external-script-embed';
import attach from '../../lib/external-script-attach';
import parser from '../../lib/settings-script-reader';
import append from '../../lib/append';

export default (data, at, em, atb, emb) => {
  const sources = (at || [])
    .map(parser)
    .map(s=>{
      s.source = "../" + s.source
      return s;
    })
    .map(attach)
    .join('') + (em || [])
    .map(parser)
    .map(s=>{
      s.source = path.resolve(process.cwd(), s.source);
      return s;
    })
    .map(embed)
    .join('');
  const bsources = (atb || [])
    .map(parser)
    .map(s=>{
      s.source = "../" + s.source
      return s;
    })
    .map(attach)
    .join('') + (emb || [])
    .map(parser)
    .map(s=>{
      s.source = path.resolve(process.cwd(), s.source);
      return s;
    })
    .map(embed)
    .join('');
    return '<!doctype html>' +   append(ReactDOMServer.renderToStaticMarkup(<PostPage {...data}/>), sources, bsources);
};
