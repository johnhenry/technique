require('babel-core/register')({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: false,
  presets: ["es2015", "babel-preset-stage-0"]
});
require('./todo.js');
