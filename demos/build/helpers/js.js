module.exports = function(input, output){
  const fs = require('fs-extra');
  const browserify = require('browserify');
  const babelify = require('babelify');
  const minifyify = require('minifyify');
  return browserify({debug:true})
    .plugin('minifyify', {map: true, output: output + 'script.js.map'})
    .transform(babelify)
    .require(input, { entry: true })
    .bundle()
    .on('error', function (err) { console.log('Error: ' + err.message); })
    .pipe(fs.createWriteStream(output + 'script.js'));
}
