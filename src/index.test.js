// importing the "expect"" style from chai as our assertion library
import {expect} from "chai";
import jsdom from "jsdom";
import fs from "fs"; // this resource comes from node (file system)

describe("Our first test", () => {
  it("should pass", () => {
    expect(true).to.equal(true);
  });
});

describe("index.html", () => {
  // passing in done function which we will invoke when we are finished testing so mocha knows it is done
  it("should have H1 that says 'Users'", (done) => {
     // reference to our html file
    const index = fs.readFileSync("./src/index.html", "utf-8");
    // defining the js dom environment; pass the reference to our physical file to create this
    // you can optionally pass an array of javascript files into the jsdom.env function if you want javascript to run as part of the environment
    // beware of using "fetch" in these scenarios as it is a browser function.  There is a different type of fetch you'll need to use
    // our second parameter here is a callback which is fired after the environment is created (takes err, and window params = window in browser)
    jsdom.env(index, function(err, window) {
      // finds the element in the dom (getting the first h1)
      const h1 = window.document.getElementsByTagName("h1")[0];
      // assert that we will have a particular value
      expect(h1.innerHTML).to.equal("Users");
      // when we call jsdom there is an asynchronous call that occurs.  We have to set up our test to be asynch.
      done();
      // free up memory from in-memory dom
      window.close();
    });
  });
});
