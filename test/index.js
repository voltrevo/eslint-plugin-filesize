'use strict';

// core modules
var assert = require('assert');
var path = require('path');

// community modules
var Promise = require('bluebird');

// local modules
var fileTooBig = require('../lib/rules/fileTooBig.js');

// transformed modules
var fs = Promise.promisifyAll(require('fs'));
var tmp = Promise.promisifyAll(require('tmp'));

var tmpDir = tmp.dirAsync({unsafeCleanup: true});

var tmpFile = function(fname, content) {
  var fpath = undefined;

  return tmpDir.then(function(dpath) {
    fpath = path.join(dpath, fname);
    return fs.writeFileAsync(path.join(dpath, fname), content);
  }).then(function() {
    return fpath;
  });
};

var context = function(fname, content) {
  return tmpFile(fname, content).then(function(fpath) {
    var reports = [];

    return {
      getFilename: function() {
        return fpath;
      },
      options: [2, {limit: 1536}],
      report: function() {
        reports.push(Array.prototype.slice.apply(arguments));
      },
      getReports: function() {
        return reports;
      }
    };
  });
};

describe('eslint-plugin-filesize', function() {
  it('doesn\'t report anything for an empty file', function() {
    return context('empty.js', '').then(function(context) {
      fileTooBig(context).Program('mock-node');
      assert.deepEqual(context.getReports(), []);
    });
  });

  it('doesn\'t report anything for a small file', function() {
    return context('small.js', 'awehaioidfboaidhfboiashdobhadb').then(function(context) {
      fileTooBig(context).Program('mock-node');
      assert.deepEqual(context.getReports(), []);
    });
  });
});
