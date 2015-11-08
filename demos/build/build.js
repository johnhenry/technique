var fs = require('fs-extra');
var path = require('path');
var yargs = require('yargs');
var OUTPUTDIR = '../client/';
var output = path.resolve(__dirname, OUTPUTDIR) + '/';
var rmdir = require('./helpers/rmdir');

var argv = require('yargs').argv;
var APPLICATION = argv._[0];
var PARALLEL = argv._[1] === 'parallel';
var ASSETS_TARGET;
var JS_TARGET;
var CSS_TARGET;
var HTML_HELPER;

switch(APPLICATION){
  case undefined:
  case 'undefined':
  case 'todo-static':
    ASSETS_TARGET = 'assets';
    JS_TARGET = 'todo-static.js';
    CSS_TARGET = 'todo.css';
    HTML_HELPER = 'html.js';
    break;
  case 'todo-server':
    ASSETS_TARGET = 'assets';
    JS_TARGET = 'todo-server.js';
    CSS_TARGET = 'todo.css';
    HTML_HELPER = 'html.js';
    break;
  case 'blog-static':
    ASSETS_TARGET = 'assets';
    CSS_TARGET = 'blog.css';
    HTML_HELPER = 'html-blog.js';
    break;
  case 'blog-server':
    ASSETS_TARGET = 'assets';
    CSS_TARGET = 'blog.css';
    break;
  default:
    throw new Error(`Application Not Recognized: ${APPLICATION}`);
    break;
};

if(argv._[2] === 'assets'){
  ASSETS_TARGET = '';
  console.log('skipping assets')
};
if(argv._[3] === 'scripts'){
  JS_TARGET = '';
  console.log('skipping scripts')
};
if(argv._[4] === 'styles'){
  CSS_TARGET = '';
  console.log('skipping styles')
};
if(argv._[5] === 'html'){
  HTML_HELPER = '';
  console.log('skipping html')
};

var moveAssets = function(ASSETS_TARGET){
  if(!ASSETS_TARGET) return;
  console.log('moving assets');
  try{
    fs.mkdirSync(output + 'assets');
    //01.1 Copy Assets
    fs.copySync(path.resolve(__filename, '../../' + ASSETS_TARGET), output + 'assets');
  }catch(error){
    throw new Error(`Error Moving Assets: ${error}`);
  }
};

var compileJS = function(JS_TARGET){
  if(!JS_TARGET) return {
    on:function(event, handler){
      handler();
    }
  };
  console.log('compling scripts');
  return require('./helpers/js')(path.resolve(__filename, '../../script/' + JS_TARGET), output).on('error', function(){
    throw new Error(`Error compiling Scripts: ${error}`);
  });
};

var compileCSS = function(CSS_TARGET){
  if(!CSS_TARGET) return Promise.resolve();
  console.log('compling styles');
  return require('./helpers/css')(path.resolve(__filename, '../../style/' + CSS_TARGET), output).catch(function(error){
    throw new Error(`Error compiling Styles: ${error}`);
  });
};

var compileHTML = function(HTML_HELPER){
  if(!HTML_HELPER) return;
  console.log('compling html');
  try{
    require('babel-core/register')({ignore: false})
    require('./helpers/' + HTML_HELPER);
  }catch(error){
    throw new Error(`Error compiling HTML: ${error}`);
  }
}
try{
  rmdir(output);
  fs.mkdirSync(output);
  moveAssets(ASSETS_TARGET);
  //01.0 Create Folders
  if(PARALLEL){
    console.log('compliling in parallel')
    compileJS(JS_TARGET);
    compileCSS(CSS_TARGET);
    compileHTML(HTML_HELPER);
  }else{
    console.log('compiling sequentially')
    compileJS(JS_TARGET).on('finish', function(){
      compileCSS(CSS_TARGET).then(function(){
        compileHTML(HTML_HELPER);
      });
    });
  }
}catch(error){
  console.error(error);
  rmdir(output);
}
