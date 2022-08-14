const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

module.exports = {
  // Webpack starting point
  entry: [paths.src + '/index.js'],

  // Webpack output
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Webpack build
  plugins: [
    // Clean unused files/folders
    new CleanWebpackPlugin(),

    // Copies files to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Generates an HTML file
    new HtmlWebpackPlugin({
      title: 'Landingpage title',
      // favicon: paths.src + '',
      template: paths.src + '/index.html', // template file
      filename: 'index.html', // output file
    }),
  ],

  // Manage modules for build
  module: {
    rules: [
      // JavaScript: Use Babel
      { test: /\.js$/, use: ['babel-loader'] },

      // Images: Copy image files
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts/SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
