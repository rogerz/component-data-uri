var Builder = require('component-builder'),
    fs = require('fs'),
    dataUri = require('..');

var builder = new Builder(__dirname);

builder.use(dataUri);

builder.build(function (err, res) {
  if (err) {
    console.log(err);
  }
  fs.writeFileSync('example/build.js', res.require + res.js);
});
