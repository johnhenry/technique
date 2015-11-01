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

  //01.2 Compile JS
  var browserify = require('browserify');
  var babelify = require('babelify');
  browserify()
    .transform(babelify)
    .require(input + 'script/_.server.js', { entry: true })
    .bundle()
    .on('error', function (err) { console.log('Error: ' + err.message); })
    .pipe(fs.createWriteStream(output + 'script.js'));

  //01.3Compile CSS
  var postcss = require('postcss');
  var postcssExtend = require('postcss-extend');
  var postcssImport = require('postcss-import');
  var cssNext = require('cssnext');
  var postcssNested = require('postcss-nested');
  var cssnano = require('cssnano');
  var autoprefixer = require('autoprefixer');
  postcss([
    postcssImport
    ,postcssExtend
    ,cssNext()
    ,postcssNested
    ,autoprefixer
    ,cssnano
  ])
  .process(fs.readFileSync(input + '/style/_.css','utf-8'),{
        from: input + '/style/_.css',
        to:   output + 'style.css',
        map: { inline: false }
    })
  .then(function (result) {
      fs.writeFileSync(output + 'style.css', result.css);
      if ( result.map ) fs.writeFileSync(output + 'style.css.map', result.map);
  }).catch(function(error){console.error(error)});


}catch(error){
  console.log(error);
  rmDir(output);
}
//02 Build HTML
require('babel/register')({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: false
  //Set the experimental proposal stage.
  //More: (http://babeljs.io/docs/usage/experimental/)
  ,stage:0
});
require('./html.js');
