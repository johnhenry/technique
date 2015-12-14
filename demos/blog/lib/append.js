/**
  @description Append string to the head and body of an HTML string
  @param {string} html HTML string to which to append.
  @param {string} [head = ''] string to append at end of head
  @param {string} [body = ''] string to append at end of body
  @returns {string}
 */
export default (html, head, body) => html
  .replace('</head>', (head ? head : '') + '</head>')
    .replace('</body>', (body ? body : '')  + '</body>');
