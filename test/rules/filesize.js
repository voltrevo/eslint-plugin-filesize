'use strict';

// core modules
var assert = require('assert');
var path = require('path');

// community modules
var range = require('range').range;

// local modules
var filesize = require('../../lib/rules/filesize.js');

var MockContext = function(fname, content) {
  var reports = [];

  return {
    getFilename: function() {
      return path.sep + 'tmp' + path.sep + fname;
    },
    getSourceCode: function() {
      return {
        getText: function() {
          return content;
        }
      };
    },
    options: [{limit: 1536}],
    report: function() {
      reports.push(Array.prototype.slice.apply(arguments));
    },
    getReports: function() {
      return reports;
    }
  };
};

describe('eslint-plugin-filesize', function() {
  it('doesn\'t report anything for an empty file', function() {
    var context = MockContext('empty.js', '');
    filesize(context).Program('mock-node');
    assert.deepEqual(context.getReports(), []);
  });

  it('doesn\'t report anything for a small file', function() {
    var context = MockContext('small.js', 'awehaioidfboaidhfboiashdobhadb');
    filesize(context).Program('mock-node');
    assert.deepEqual(context.getReports(), []);
  });

  it('reports when file is too big', function() {
    var context = MockContext(
      'big.js',
      range(500000).map(function(i) {
        return String.fromCharCode(97 + (i * i * i) % 26);
      }).join('')
    );

    filesize(context).Program('mock-node');

    assert.deepEqual(
      context.getReports(),
      [['mock-node', 'big.min.js.gz is 2021 bytes (limit: 1536)']]
    );
  });

  it('reports bad config', function() {
    var context = MockContext('empty.js', '');
    context.options = ['foobar'];
    filesize(context).Program('mock-node');

    assert.deepEqual(
      context.getReports(),
      [['mock-node', 'invalid config (context.options[0]: "foobar")']]
    );
  });
});
