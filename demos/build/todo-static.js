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
  //01.2 Compile JS
  require('./helpers/js')(path.resolve(__filename, '../../script/todo-static.js'), output).on('finish', function(){
    //01.3 Compile CSS
    require('./helpers/css')(path.resolve(__filename, '../../style/todo.css'), output).then(function(){
      require('babel-core/register')({
        // This will override `node_modules` ignoring - you can alternatively pass
        // an array of strings to be explicitly matched or a regex / glob
        ignore: false
      });try{
        require('./helpers/html.js');
      }catch(error){
        console.error("HTML", error)
      }
    });
  });
}catch(error){
  console.log(error);
  rmdir(output);
}
