'use strict';

// This is taken from eslint-plugin-require-path-exists:
// https://github.com/BohdanTkachenko/eslint-plugin-require-path-exists/blob/df92d0e/rules/exists.js

var fs = require('fs');
var path = require('path');

var isAtom = function() {
  try {
    if (typeof window !== undefined && typeof window.atom !== undefined) {
      return true;
    }
  } catch (e) {
    return false;
  }

  return false;
};

module.exports = function(context) {
  if (!isAtom()) {
    var filename = context.getFilename();
    if (fs.isAbsolute(filename)) {
      return path.dirname(filename);
    }

    return path.dirname(path.join(process.cwd(), context.getFilename()));
  }

  // TODO: we need this hack until https://github.com/AtomLinter/linter-eslint/pull/89 will be merged
  var editor = window.atom.workspace.getActivePaneItem();
  if (!editor) {
    return null;
  }

  return path.dirname(editor.getPath());
};
