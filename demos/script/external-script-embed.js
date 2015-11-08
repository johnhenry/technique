import fs from 'fs';
export default s =>{
  const code = fs.readFileSync(s.source, 'utf-8');
  return s.type === 'style' ? `${(s.amp ? '<style>body {opacity: 0}</style><noscript><style>body {opacity: 1}</style></noscript>' : '')}<style rel="stylesheet"${(s.amp ? ' amp-custom' : '')}>${code}</style>` :
  `<script${(s.async? ' async' : '')}${(s.defer? ' defer' : '')}>${code}</script>`
};
