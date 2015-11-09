'use strict';

// core modules
var zlib = require('zlib');

// community modules
var uglifyJs = require('uglify-js');

module.exports = function(str) {
  return zlib.gzipSync(uglifyJs.minify(str, {fromString: true}).code).length;
};
