import fs from 'fs';
var appendToHead  = (html, srcs) => html.replace('</head>', srcs + '</head>');
var injectScript  = (...srcs) => html => appendToHead(html, srcs.map(src => '<script src=\"'+ src +'\"></script>').join(''));
var injectScriptDefer  = (...srcs) => html => appendToHead(html, srcs.map(src => '<script defer src=\"'+ src +'\"></script>').join(''));
var injectStyle   = (...srcs) => html => appendToHead(html, srcs.map(src => '<link rel="stylesheet" href=\"'+ src +'\" />').join(''));
var insertScript  = (...srcs) => html => appendToHead(html, srcs.map(src=> fs.readFileSync(src, 'utf-8')).map(src => '<script>' + src + ' </script>').join(''));
var insertStyle   = (...srcs) => html => appendToHead(html, srcs.map(src=> fs.readFileSync(src, 'utf-8')).map(src => '<style>' + src.split('\n').join(' ') + ' </style>').join(''));
export {injectScript, injectScriptDefer, injectStyle, insertScript, insertStyle};
