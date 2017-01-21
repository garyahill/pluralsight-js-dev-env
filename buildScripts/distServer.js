// load webserver and other modules
import express from "express";
import path from "path";
import open from "open";
import compression from "compression";

/* eslint-disable no-console */
const port = 3000;
const app = express();

// gzip compress files (not working for some reason)
app.use(compression());
// add express support for serving static files
app.use(express.static("dist"));

// req = request; res = response;
// __dirname is a special command;
// "/" requesting the root
// sending the file that we specify "index.html"
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// setting up an mocked api call to get users (pretend this hits a db)
app.get("/users", function(req, res){
  res.json([
    {"id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@gmail.com"},
    {"id": 2, "firstName": "Tammy", "lastName": "Norton", "email": "tnorton@gmail.com"},
    {"id": 3, "firstName": "Tina", "lastName": "Lee", "email": "t.lee@gmail.com"}
  ]);
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
