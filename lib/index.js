'use strict';

module.exports = {
  rules: {
    filesize: require('./rules/filesize.js')
  },
  rulesConfig: {
    filesize: [2, {limit: 1536}]
  }
};
