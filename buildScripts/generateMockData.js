/* This script generates mock data for local development.
 * This way you don't have to point to an actual api,
 * but you can enjoy a realistic, but randomized data, and
 * rapid page loads due to local static data
*/

/* eslint-disable no-console */

import jsf from "json-schema-faker";
import {schema} from "./mockDataSchema";
import fs from "fs";
import chalk from "chalk";

// use json schema faker with our configuration schema to get the faked json
const json = JSON.stringify(jsf(schema));

// Creates the json file with our randomized data
fs.writeFile("./src/api/db.json", json, function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log(chalk.green("Mock data generated."));
  }
});
