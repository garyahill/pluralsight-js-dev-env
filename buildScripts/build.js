/* eslint-disable no-console */
import webpack from "webpack";
import webpackConfig from "../webpack.config.prod";
import chalk from "chalk";

// indicate we are running node in production mode (this is important if you create a dev specific configuration for babel in your .babelrc file)
// babel and potentially other libraries look for this environment variable to determine how they are built
process.env.NODE_ENV = "production";

// indicate we are starting production build
console.log(chalk.blue("Generating minified bundle for production.  This will take a moment..."));

// load configuration and run the build
webpack(webpackConfig).run((err, stats) => {
  if(err) {
    console.log(chalk.red(err));
    return 1;
  }
  else{
    const jsonStats = stats.toJson();

    // log errors
    if (jsonStats.hasErrors) {
      jsonStats.errors.map(error => console.log(chalk.red(error)));
    }

    // log warnings
    if (jsonStats.hasWarnings) {
      console.log(chalk.yellow("Webpack generated the following warnings: "));
      jsonStats.warnings.map(warning => console.log(chalk.red(warning)));
    }

    console.log(`Webpack stats: ${stats}`);

    // if we got this far the build succeded
    console.log(chalk.green("Your app has been built for production and written to /dist!"));


    return 0;
  }
});
