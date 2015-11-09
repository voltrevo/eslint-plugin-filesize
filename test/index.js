'use strict';

var assert = require('assert');

var index = require('../lib/index.js');

describe('index', function() {
  it('exports rules and rulesConfig', function() {
    assert(index.rules);
    assert(index.rulesConfig);
  });
});
