import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Index from '../../component/index';
import embed  from '../../script/external-script-embed';
import attach from '../../script/external-script-attach';
import parser from '../../script/settings-script-reader';
import append from '../../script/append';
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
      s.source = path.resolve(__dirname, "../../client/", s.source);
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
        s.source = path.resolve(__dirname, "../../client/", s.source);
        return s;
      })
      .map(embed)
      .join('');
    return '<!doctype html>' +   append(ReactDOMServer.renderToStaticMarkup(<Index {...data}/>), sources, bsources);
};
