var argv = require('yargs').argv;
var SERVER = argv._[0] || '';
var TARGET;
switch(SERVER){
  case '':
  case 'todo':
    console.log('starting todo server');
    TARGET = 'todo.js';
    break;
  case 'blog':
    console.log('starting blog server')
    TARGET = 'blog.js';
    break;
  default:
    throw new Error(`SERVER Not Recognized: ${SERVER}`);
    break;
};
require('babel-core/register')({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: false,
  presets: ["es2015", "babel-preset-stage-0"]
});
require('./' + TARGET);
