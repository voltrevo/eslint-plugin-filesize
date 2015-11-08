'use strict';

// core modules
var path = require('path');

// local modules
var getCurrentFilePath = require('../util/getCurrentFilePath.js');
var minAndGzipSize = require('../util/minAndGzipSize.js');

module.exports = function(context) {
  var fpath = getCurrentFilePath(context);
  var limit = (context.options && context.options[2] && context.options[2].limit) || 1536;
  var extname = path.extname(fpath);
  var basename = path.basename(fpath, extname);

  return {
    Program: function(node) {
      var size = minAndGzipSize(getCurrentFilePath(context));

      if (size > limit) {
        context.report(node, basename + '.min' + extname + '.gz is ' + size + ' bytes (limit: ' + limit + ')');
      }
    }
  };
};
