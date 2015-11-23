module.exports = function(input, output){
  const fs = require('fs-extra');
  const postcss = require('postcss');
  const postcssExtend = require('postcss-extend');
  const postcssImport = require('postcss-import');
  const cssNext = require('cssnext');
  const postcssNested = require('postcss-nested');
  const cssnano = require('cssnano');
  const autoprefixer = require('autoprefixer');
  return postcss([
    postcssImport
    ,postcssExtend
    ,cssNext()
    ,postcssNested
    ,autoprefixer
    ,cssnano
  ])
  .process(fs.readFileSync(input,'utf-8'),{
        from: input,
        to:   output + 'style.css',
        map: { inline: false }
    })
  .then(function (result) {
      fs.writeFileSync(output + 'style.css', result.css);
      if ( result.map ) fs.writeFileSync(output + 'style.css.map', result.map);
      block = false;
  }).catch(function(error){console.error(error)});

}
