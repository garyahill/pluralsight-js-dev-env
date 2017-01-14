import path from 'path';

// configuration object for web pack
export default {
  debug: true,  // enables debug info as we run our build
  devtool: 'inline-source-map',
  noInfo: false,  // webpack will display a list of all the files its bundling (addd noise to command line, but on for now)
  // entry point into application (can pass an array, good way to inject middleware for hot reloading)
  // magic global __dirname is part of node which gets the full path
  // entry will be src/index.js
  entry: [
    path.resolve(__dirname, 'src/index')  // this is where we will look for the entry into the js application (index.js in this case)
  ],
  // tells webpack that we are targeting browser; changes how we bundle the code
  target: 'web',
  // tells webpack where we should create the bundle.js file (in the root of our src directory)
  // with our dev webserver, it won't physically create any files.  It will create a bundle in memory and serve it to the browser
  // we still need a path and name in order to simulate the physical files existence
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  // webpack plugins - to enhance webpacks power (ex: hot reload, linting etc)
  plugins: [],
  // file types we want webpack to handle (loaders); we are handling javascript and css here
  // there are other syntaxes as well so other exaples may look a little different
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
