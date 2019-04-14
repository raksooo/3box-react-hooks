const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  externals: {
    react: 'react',
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    library: "3box-react-hooks",
    libraryTarget: "umd",
    filename: "index.js"
  },
}
