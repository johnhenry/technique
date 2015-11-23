const fs = require('fs-extra');
const path = require('path');
const yargs = require('yargs');
const OUTPUTDIR = '../client/';
const output = path.resolve(__dirname, OUTPUTDIR) + '/';
const rmdir = require('./helpers/rmdir');

const argv = require('yargs')
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
  .option('verbose', {
    alias: 'v',
    describe: 'verbose',
    default: true
  })
  .argv;
const verbose = argv['verbose'] ? console.log.bind(console) : function(){};
process.on('exit', function(){
  verbose('...compliation complete.')
})
const APPLICATION = argv._[0] || '';
const PARALLEL = argv['parallel'];
var ASSETS_TARGET;
var JS_TARGET;
var CSS_TARGET;
var HTML_HELPER;

switch(APPLICATION){
  case '':
  case 'todo-static':
    verbose('building todo-static');
    ASSETS_TARGET = 'assets';
    JS_TARGET = 'todo-static.js';
    CSS_TARGET = 'todo.css';
    HTML_HELPER = 'html.js';
    break;
  case 'todo-server':
    verbose('building todo-server');
    ASSETS_TARGET = 'assets';
    JS_TARGET = 'todo-server.js';
    CSS_TARGET = 'todo.css';
    HTML_HELPER = 'html.js';
    break;
  case 'blog-static':
    verbose('building blog-static');
    ASSETS_TARGET = 'assets';
    CSS_TARGET = 'blog.css';
    HTML_HELPER = 'html-blog.js';
    break;
  case 'blog-server':
    verbose('building blog-server');
    ASSETS_TARGET = 'assets';
    CSS_TARGET = 'blog.css';
    break;
  default:
    throw new Error(`Application Not Recognized: ${APPLICATION}`);
    break;
};

const moveAssets = function(ASSETS_TARGET){
  if(!ASSETS_TARGET) return;
  verbose('moving assets...');
  const TARGET = output + ASSETS_TARGET;
  try{
  if(!fs.existsSync(TARGET)) fs.mkdirSync(TARGET);
    //01.1 Copy Assets
    fs.copySync(path.resolve(__filename, '../../' + ASSETS_TARGET), output + 'assets');
  }catch(error){
    throw new Error(`Error Moving Assets: ${error}`);
  }
  verbose('asset move complete...');
};

const compileJS = function(JS_TARGET){
  if(!JS_TARGET) return {
    on:function(event, handler){
      handler();
    }
  };
  verbose(' compling scripts...');
  return require('./helpers/js')(path.resolve(__filename, '../../script/' + JS_TARGET), output).on('finish', function(){
    verbose(' ...scripts compiled.');
  }).on('error', function(){
    throw new Error(`Error compiling Scripts: ${error}`);
  });
};

const compileCSS = function(CSS_TARGET){
  if(!CSS_TARGET) return Promise.resolve();
  verbose(' compling styles...');
  return require('./helpers/css')(path.resolve(__filename, '../../style/' + CSS_TARGET), output).then(function(){
    verbose(' ...styles compiled.');
  }).catch(function(error){
    throw new Error(`Error compiling Styles: ${error}`);
  });
};

const compileHTML = function(HTML_HELPER){
  if(!HTML_HELPER) return;
  verbose(' compling html...');
  try{
    require('babel-core/register')({ignore: false})
    require('./helpers/' + HTML_HELPER);
    verbose(' ...html compiled.');
  }catch(error){
    throw new Error(`Error compiling HTML: ${error}`);
  }
}
try{

  if(argv['assets'] === false){
    ASSETS_TARGET = '';
    verbose('skipping assets')
  };
  if(argv['scripts'] === false){
    JS_TARGET = '';
    verbose('skipping scripts')
  };
  if(argv['styles'] === false){
    CSS_TARGET = '';
    verbose('skipping styles')
  };
  if(argv['html'] === false){
    HTML_HELPER = '';
    verbose('skipping html')
  };
  if(argv['purge'] === false){
    verbose('skipping purge');
  }else{
    verbose('purging files...');
    rmdir(output);
    verbose('...purge complete.');
  };
  if(!fs.existsSync(output)) fs.mkdirSync(output);

  moveAssets(ASSETS_TARGET);
  if(PARALLEL){
    verbose('compliling in parallel...');
    compileJS(JS_TARGET);
    compileCSS(CSS_TARGET);
    compileHTML(HTML_HELPER);
  }else{
    verbose('compiling sequentially...')
    compileJS(JS_TARGET).on('finish', function(){
      compileCSS(CSS_TARGET).then(function(){
        compileHTML(HTML_HELPER);
      });
    });
  }
}catch(error){
  throw error;
};
