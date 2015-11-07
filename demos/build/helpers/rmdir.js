var fs = require('fs-extra');
var rmdir = function(destination){
    if(!fs.existsSync(destination)) return;
    if(fs.statSync(destination).isFile()) return;
    var files = fs.readdirSync(destination);
      if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
          var filePath = destination + "/" + files[i];
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
          else
            rmdir(filePath);
        }
      fs.rmdirSync(destination);
};
module.exports = rmdir;
