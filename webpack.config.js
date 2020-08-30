const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client/game.ts',
  watchOptions: {
    ignored: ["node_modules"],
  },
  output: {
    filename: 'game.js',
    path: path.join(__dirname, './dist/src'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, loader: 'ts-loader'
      }
    ]
  }
};