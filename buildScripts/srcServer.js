// load webserver and other modules
import express from "express";
import path from "path";
import open from "open";
// load webpack and the configuration
import webpack from "webpack";
import config from "../webpack.config.dev";

/* eslint-disable no-console */
const port = 3000;
const app = express();
const compiler = webpack(config);

// integrate webpack with express
app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// req = request; res = response;
// __dirname is a special command;
// "/" requesting the root
// sending the file that we specify "index.html"
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

// configuring the web sever to listen on a port we set
app.listen(port, function(err){
  if (err) {
    console.log(err);
  }
  else {
    open("http://localhost:" + port);
  }
});
