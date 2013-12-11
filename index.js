'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var mime = require('mime');

module.exports = function (builder) {
  builder.hook('before scripts', function(pkg, callback){
    if (!pkg.config.templates) {
      return callback();
    }
    pkg.config.templates.filter(function (file) {
      return /\.(png|jpg|bmp)$/.test(file);
    }).forEach(function (file) {
      var fullPath = pkg.path(file);

      // http://nodeexamples.com/2012/09/26/base-64-encoding-images-in-node-js/
      var data = fs.readFileSync(fullPath).toString('base64');
      var converted = util.format('"data:%s;base64,%s"', mime.lookup(file), data);

      pkg.removeFile('templates', file);
      pkg.addFile('scripts', file + '.js', 'module.exports = ' + converted);
    });
    return callback();
  });
};
