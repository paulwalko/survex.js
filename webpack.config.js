const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './wasm/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'survex.js',
    library: {
      name: 'survexjs',
      type: 'umd',
    },
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
