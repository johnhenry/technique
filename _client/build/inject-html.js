var inject        = (html, srcs) => html.replace('</head>', srcs + '</head>');
var injectScript  = (...srcs) => html => inject(html, srcs.map(src => '<script defer src=\"'+ src +'\"></script>').join(''));
var injectStyle   = (...srcs) => html => inject(html, srcs.map(src => '<link rel="stylesheet" href=\"'+ src +'\" />').join(''));
export {injectScript, injectStyle};
