const webpack = require('webpack');

module.exports = {
  entry: './src/api.js',
  output: {
    library: '3box-react-hooks-api',
    libraryTarget: 'umd',
    filename: 'api.js'
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
    react: 'react'
  },
}
