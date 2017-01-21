import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// configuration object for web pack
export default {
  debug: true,  // enables debug info as we run our build
  devtool: 'source-map',  // recommended production setting (highest quality, but slower to build)
  noInfo: false,  // webpack will display a list of all the files its bundling (addd noise to command line, but on for now)
  // entry point into application (can pass an array, good way to inject middleware for hot reloading)
  // magic global __dirname is part of node which gets the full path
  // creating two entry points.  This is because we are going to bundle our code and vendor code seperately
  // these entry points will be used in conjuction with the webpack.optimize.CommonsChunkPlugin below
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    vendor: path.resolve(__dirname, 'src/vendor.js')
  },
  // tells webpack that we are targeting browser; changes how we bundle the code
  target: 'web',
  // since this is the production build we are creating physical files
  // since we are splitting our app into more than one bundle we can no longer hard code the name of the bundle.  We leave a placeholder "name" for the webpack bundler to fill in (one for each entry point)
  // it will also insert both of these bundle names it creates into our index.html page
  // uses the md5 hash plugin to help generate the file name
  output: {
    path: path.resolve(__dirname, 'dist'), // different location for prod "dist" (popular convention)
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  // webpack plugins
  plugins: [
    // plugin used to generate a css file with a hash in the filename (extracts the css from our js bundle and create a seperate css file bundle)
    new ExtractTextPlugin("[name].[contenthash].css"),
    // md5 hash plugin used for file naming/cahce busting
    new WebpackMd5Hash(),
    // Use CommonsChunkPlugin to create a seperate bundle of vendor libraries so they are cached seperately (this is a built-in webpack code splitting optimization plugin)
    // naming "vendor" here tells webpack to leave the vendor code out of bundle.js
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),
    // add plugin for generating our index.html file (uses our index.html as the souce template)
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespaces: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      trackJSToken: "387328d49ca9447fb74f7c9fa2e0d4e2"
    }),
    // eliminate duplicate packages
    new webpack.optimize.DedupePlugin(),
    // minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  // file types we want webpack to handle (loaders); we are handling javascript and css here
  // there are other syntaxes as well so other exaples may look a little different
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("css?sourceMap")}
    ]
  }
}
