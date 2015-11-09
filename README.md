# eslint-plugin-filesize [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> An eslint plugin that limits the minified + gzipped size of a file.

## Usage

1. Install `eslint-plugin-filesize` as a dev-dependency:

```sh
$ npm install --save-dev eslint-plugin-filesize
```

2. Enable the plugin by adding it to your .eslintrc:

```json
plugins: [
  "filesize"
]
```

## Configuration

By default the limit is to report an error when 1,536 bytes is exceeded. You can adjust this by setting the `filesize/filesize` rule in your .eslintrc:

```json
rules: {
  "filesize/filesize": [2, {"limit": 800}]
}
```

As standard in eslint, set that first element to 1 to make this a warning instead of an error.

## License

MIT © [Andrew Morris](https://andrewmorris.io/)


[npm-image]: https://badge.fury.io/js/eslint-plugin-filesize.svg
[npm-url]: https://npmjs.org/package/eslint-plugin-filesize
[travis-image]: https://travis-ci.org/voltrevo/eslint-plugin-filesize.svg?branch=master
[travis-url]: https://travis-ci.org/voltrevo/eslint-plugin-filesize
[daviddm-image]: https://david-dm.org/voltrevo/eslint-plugin-filesize.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/voltrevo/eslint-plugin-filesize
[coveralls-image]: https://coveralls.io/repos/voltrevo/eslint-plugin-filesize/badge.svg
[coveralls-url]: https://coveralls.io/r/voltrevo/eslint-plugin-filesize
