// we can just import our css file here (in our application entry point) and webpack will havndle its bundling too since we have configured webpack to handle css
import './index.css';

import numeral from "numeral";

const courseValue = numeral(1000).format("$0,0.00");
// using the ES6 template string feature so we use back-ticks vs apostrophes

// (note we wouldn't normally allow this in client code)
console.log(`I would pay ${courseValue} for this course!`);  // eslint-disable-line no-console
