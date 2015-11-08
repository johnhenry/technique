module.exports = function(input, output){
  var fs = require('fs-extra');
  var browserify = require('browserify');
  var babelify = require('babelify');
  var minifyify = require('minifyify');
  return browserify({debug:true})
    .plugin('minifyify', {map: true, output: output + 'script.js.map'})
    .transform(babelify)
    .require(input, { entry: true })
    .bundle()
    .on('error', function (err) { console.log('Error: ' + err.message); })
    .pipe(fs.createWriteStream(output + 'script.js'));
}
