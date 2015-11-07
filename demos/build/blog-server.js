var fs = require('fs-extra');
var path = require('path');
var OUTPUTDIR = '../client/';
var output = path.resolve(__dirname, OUTPUTDIR) + '/';
var rmdir = require('./helpers/rmdir');
//00 Clear Destination
rmdir(output);
//01 Create Files
try{
  //01.0 Create Folders
  fs.mkdirSync(output);
  fs.mkdirSync(output + 'assets');
  //01.1 Copy Assets
  fs.copySync(path.resolve(__filename, '../../assets'), output + 'assets');
  //01.2 Compile CSS
  require('./helpers/css')(path.resolve(__filename, '../../style/blog.css'), output);
}catch(error){
  console.log(error);
  rmdir(output);
}
