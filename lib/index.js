'use strict';

module.exports = {
  rules: {
    fileTooBig: require('./rules/fileTooBig.js')
  },
  rulesConfig: {
    fileTooBig: 2,
    fileTooBigSize: 1536
  }
};
