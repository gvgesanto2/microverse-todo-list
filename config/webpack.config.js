const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin.js');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/i,
        // from all svg images
        // include only sprite image
        include: /.*sprite\.svg/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              publicPath: '',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: './dist',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
    }),
    new SpriteLoaderPlugin(),
  ],
};
