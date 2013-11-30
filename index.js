'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var mime = require('mime');

function filterImages (filename) {
  var extnames = [
      '.png',
      '.jpe'
  ];

  return extnames.indexOf(path.extname(filename)) >= 0;
}

module.exports = function (builder) {
  builder.hook('before scripts', function(pkg, callback){
    if (!pkg.config.templates) {
      return callback();
    }
    var files = pkg.config.templates.filter(filterImages);
    files.forEach(function (file) {
      var fullPath = pkg.path(file);

      // http://nodeexamples.com/2012/09/26/base-64-encoding-images-in-node-js/
      var data = fs.readFileSync(fullPath).toString('base64');
      var converted = util.format('data:%s;base64,%s', mime.lookup(file), data);

      pkg.removeFile('templates', file);
      pkg.addFile('scripts', file + '.js', 'module.exports = ' + converted);
    });
    return callback();
  });
};
