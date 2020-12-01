const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index.js'
  },
  output: {
    path: path.join(__dirname,'dist'),
    filename: "[name].js",
    publicPath:'/dist'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      },
    ],
  }
}