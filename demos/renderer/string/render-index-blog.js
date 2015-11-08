import path from 'path';
import ReactDOMServer from 'react-dom/server';
import IndexPage from '../../component/index-page.js';
import embed  from '../../script/external-script-embed';
import attach from '../../script/external-script-attach';
import parser from '../../script/settings-script-reader';
import append from '../../script/append';
var render =  (data, at, em, atb, emb) => {
  var sources = (at || [])
    .map(parser)
    .map(attach)
    .join('') + (em || [])
    .map(parser)
    .map(s=>{
      s.source = path.resolve(__dirname, "../../client/", s.source);
      return s;
    })
    .map(embed)
    .join('');
  var bsources = (atb || [])
    .map(parser)
    .map(attach)
    .join('') + (emb || [])
    .map(parser)
    .map(s=>{
      s.source = path.resolve(__dirname, "../../client/", s.source);
      return s;
    })
    .map(embed)
    .join('');
    return '<!doctype html>' +   append(ReactDOMServer.renderToStaticMarkup(IndexPage(data)), sources, bsources);
};
export default render;
