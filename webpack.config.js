const webpack = require('webpack');

module.exports = {
  entry: './src/3boxHooks.js',
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
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
}
