import fs from 'fs';
import request from 'sync-request';
/**
   @description Transform pre-embedded objects into into embedded script/link(style) strings.
   @param {
    source  :String,
    async   :[Boolean],
    defer   :[Boolean],
    amp     :[Boolean]}
  } s
  s @returns String
 */
export default s =>{
  var code;
  if(s.source.indexOf('http') !== -1){
    var source =  s.source.substring(s.source.indexOf('http'));
    source = source.replace('http:/', 'http://');
    source = source.replace('https:/', 'https://');
    code = String(request('GET', source).getBody());
  }else{
    code = fs.readFileSync(s.source, 'utf-8');
  }
  return s.type === 'style' ? `${(s.amp ? '<style>body {opacity: 0}</style><noscript><style>body {opacity: 1}</style></noscript>' : '')}<style rel="stylesheet"${(s.amp ? ' amp-custom' : '')}>${code}</style>` :
  `<script${(s.async? ' async' : '')}${(s.defer? ' defer' : '')}>${code}</script>`
};
