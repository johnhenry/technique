import fs from  'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import renderIndex from '../../renderer/string/render-index';
import {TODO, SERVER}  from '../../settings';
var OUTPUTDIR = '../../';
var output = path.resolve(__filename, OUTPUTDIR, SERVER.STATICDIR) + '/';
var file = renderIndex({}, TODO.ATTACH, TODO.EMBED, TODO.ATTACHBODY, TODO.EMBEDBODY);
fs.writeFileSync(
    output + "index.html",
    file
    );
