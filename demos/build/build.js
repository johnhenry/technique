var fs = require('fs-extra');
var path = require('path');
var yargs = require('yargs');
var OUTPUTDIR = '../client/';
var output = path.resolve(__dirname, OUTPUTDIR) + '/';
var rmdir = require('./helpers/rmdir');

var argv = require('yargs')
  .help('help')
  .option('parallel', {
    alias: 'p',
    describe: 'run build processes in parallel',
    default: false
  })
  .option('purge', {
    alias: 'u',
    describe: 'purge client folder before building',
    default: true
  })
  .option('assets', {
    alias: 'a',
    describe: 'include assets',
    default: true
  })
  .option('scripts', {
    alias: 's',
    describe: 'include scripts',
    default: true
  })
  .option('styles', {
    alias: 't',
    describe: 'include styles',
    default: true
  })
  .option('html', {
    alias: 'h',
    describe: 'include html',
    default: true
  })
  .argv;
var APPLICATION = argv._[0] || '';
var PARALLEL = argv['parallel'];
var ASSETS_TARGET;
var JS_TARGET;
var CSS_TARGET;
var HTML_HELPER;

switch(APPLICATION){
  case '':
  case 'todo-static':
    console.log('building todo-static');
    ASSETS_TARGET = 'assets';
    JS_TARGET = 'todo-static.js';
    CSS_TARGET = 'todo.css';
    HTML_HELPER = 'html.js';
    break;
  case 'todo-server':
    console.log('building todo-server');
    ASSETS_TARGET = 'assets';
    JS_TARGET = 'todo-server.js';
    CSS_TARGET = 'todo.css';
    HTML_HELPER = 'html.js';
    break;
  case 'blog-static':
    console.log('building blog-static');
    ASSETS_TARGET = 'assets';
    CSS_TARGET = 'blog.css';
    HTML_HELPER = 'html-blog.js';
    break;
  case 'blog-server':
    console.log('building blog-server');
    ASSETS_TARGET = 'assets';
    CSS_TARGET = 'blog.css';
    break;
  default:
    throw new Error(`Application Not Recognized: ${APPLICATION}`);
    break;
};

var moveAssets = function(ASSETS_TARGET){
  if(!ASSETS_TARGET) return;
  console.log('moving assets');
  var TARGET = output + ASSETS_TARGET;
  try{
  if(!fs.existsSync(TARGET)) fs.mkdirSync(TARGET);
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

  if(argv['assets'] === false){
    ASSETS_TARGET = '';
    console.log('skipping assets')
  };
  if(argv['scripts'] === false){
    JS_TARGET = '';
    console.log('skipping scripts')
  };
  if(argv['styles'] === false){
    CSS_TARGET = '';
    console.log('skipping styles')
  };
  if(argv['html'] === false){
    HTML_HELPER = '';
    console.log('skipping html')
  };
  if(argv['purge'] === false){
    console.log('skipping purge');
  }else{
    rmdir(output);
  };
  if(!fs.existsSync(output)) fs.mkdirSync(output);

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
}
