const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    library: '3box-react-hooks',
    libraryTarget: 'umd',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: ['.js']
        },
        use: 'babel-loader',
      }
    ]
  },
  externals: {
    react: 'react',
    '3box': '3box',
  },
}
