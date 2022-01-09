const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './wasm/index.js',
  mode: 'production',
  output: {
    filename: 'survex.js',
    library: {
      name: 'survexjs',
      type: 'umd',
    },
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      path: require.resolve('path-browserify'),
      fs: require.resolve('fs'),
    },
  },
};
