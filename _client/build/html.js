import fs from  'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import renderIndex from './render-index';
import {SERVER, CLIENT}  from '../../settings';
import {injectScriptInternal, injectStyleInternal, injectScript, injectScriptDefer, injectStyle} from './inject-html';
var OUTPUTDIR = '../';
var output = path.resolve(__dirname, OUTPUTDIR, SERVER.STATICDIR) + '/';
var file = renderIndex({});
file = injectStyleInternal.apply(undefined, CLIENT.INTERNALSTYLES.map(p=>path.resolve(__dirname,p)))(file);
file = injectScriptInternal.apply(undefined, CLIENT.INTERNALSCRIPTS.map(p=>path.resolve(__dirname,p)))(file);
file = injectStyle.apply(undefined, CLIENT.STYLES)(file);
file = injectScript.apply(undefined, CLIENT.SCRIPTS)(file);
file = injectScriptDefer.apply(undefined, CLIENT.DEFEREDSCRIPTS)(file);
fs.writeFileSync(
    output + "index.html",
    file
    );
