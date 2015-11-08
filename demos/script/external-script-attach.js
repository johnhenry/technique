export default s => {
  return s.type === 'style' ? `<link rel="stylesheet" href="${s.source}"/>` :
  `<script =src"${s.source}"${(s.async? ' async' : '') }${ (s.defer? ' defer' : '') }></script>`;
};
