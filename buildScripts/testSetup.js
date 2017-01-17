// This file itself is not transpiled so we must use commonjs and ES5

// Register babel-register; this will tell mocha to transpile our tests (not this file) before running our tests
require("babel-register");

// Disable webpack features (for Mocha) that Mocha doesn't understand; webpack understands importing css files, but mocha does not.
// we are telling mocha that is it sees "import './index.css'" just treat it like an empty function
require.extensions[".css"] = function() {};
