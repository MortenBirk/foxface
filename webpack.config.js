const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'foxface.js',
    library: 'foxface',
    libraryTarget: 'umd',
  },
};