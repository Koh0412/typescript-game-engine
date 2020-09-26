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
    alias: {
      '@engine': path.resolve(__dirname, './src/engine')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/, loader: 'ts-loader'
      }
    ]
  }
};
