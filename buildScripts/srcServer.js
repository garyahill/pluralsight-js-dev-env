// load express module and other needed modules
var express = require("express");
var path = require("path");
var open = require("open")

var port = 3000;
var app = express();

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
