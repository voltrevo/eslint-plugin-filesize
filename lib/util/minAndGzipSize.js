'use strict';

// core modules
var zlib = require('zlib');

// community modules
var uglifyJs = require('uglify-js');

module.exports = function(fpath) {
  return zlib.gzipSync(uglifyJs.minify(fpath).code).length;
};
