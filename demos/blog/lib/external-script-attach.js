/**
  @description Transform pre-attached objects into into attached script/link(style) strings.
  @param {
   {string} source,
   {boolean} [async = false],
   {boolean} [defer = false]
 } s
  @returns String
*/
export default s => {
  return s.type === 'style' ? `<link rel="stylesheet" href="${s.source}"/>` :
  `<script src="${s.source}"${(s.async? ' async' : '') }${ (s.defer? ' defer' : '') }></script>`;
};
