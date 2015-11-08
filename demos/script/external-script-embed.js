import fs from 'fs';
export default s =>{
  const code = fs.readFileSync(s.source, 'utf-8');
  return s.type === 'style' ? `<style rel="stylesheet"${(s.amp ? ' amp-style' : '')}>${code}</style>` :
  `<script${(s.async? ' async' : '')}${(s.defer? ' defer' : '')}>${code}</script>`
};
