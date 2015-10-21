import fs from  'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import renderIndex from './render-index';
import {SERVER, CLIENT}  from '../../settings';
import {injectScript, injectStyle} from './inject-html';
var OUTPUTDIR = '../';
var output = path.resolve(__dirname, OUTPUTDIR, SERVER.STATICDIR) + '/';
var file = renderIndex({});
file = injectStyle.apply(undefined, CLIENT.STYLES)(file);
file = injectScript.apply(undefined, CLIENT.SCRIPTS)(file);
fs.writeFileSync(
    output + "index.html",
    file
    );
