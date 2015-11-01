module.exports = function(input, output){
  var fs = require('fs-extra');
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
}
