export default (html, head, body) => html
  .replace('</head>', (head ? head : '') + '</head>')
    .replace('</body>', (body ? body : '')  + '</body>');
