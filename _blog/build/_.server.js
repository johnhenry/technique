var fs = require('fs-extra');
var path = require('path');
var OUTPUTDIR = '../../client/';
var INPUTDIR = '../';
var output = path.resolve(__dirname, OUTPUTDIR) + '/';
var input = path.resolve(__dirname, INPUTDIR) + '/';

//00 Clear Destination
var rmDir = function(destination){
    if(!fs.existsSync(destination)) return;
    if(fs.statSync(destination).isFile()) return;
    var files = fs.readdirSync(destination);
      if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
          var filePath = destination + "/" + files[i];
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
          else
            rmDir(filePath);
        }
      fs.rmdirSync(destination);
};
rmDir(output);

//01 Create Files
try{
  //01.0 Create Folders
  fs.mkdirSync(output);
  fs.mkdirSync(output + 'assets');
  //01.1 Copy Assets
  fs.copySync(input + 'assets', output + 'assets');
  //01.2Compile CSS
  require('./css')(input, output);
}catch(error){
  console.log(error);
  rmDir(output);
}
