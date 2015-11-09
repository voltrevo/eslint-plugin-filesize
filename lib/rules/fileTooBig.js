'use strict';

// core modules
var path = require('path');

// local modules
var getCurrentFilePath = require('../util/getCurrentFilePath.js');
var minAndGzipSize = require('../util/minAndGzipSize.js');

module.exports = function(context) {
  var fpath = getCurrentFilePath(context);
  var config = context.options[0] || {};

  if (typeof config !== 'object') {
    return {
      Program: function(node) {
        context.report(
          node,
          'invalid config (context.options[0]: ' + JSON.stringify(context.options[0]) + ')'
        );
      }
    };
  }

  var limit = config.limit || 1536;
  var extname = path.extname(fpath);
  var basename = path.basename(fpath, extname);

  return {
    Program: function(node) {
      var size = minAndGzipSize(context.getSourceCode().getText());

      if (size > limit) {
        var minGzName = basename + '.min' + extname + '.gz';
        context.report(node, minGzName + ' is ' + size + ' bytes (limit: ' + limit + ')');
      }
    }
  };
};
