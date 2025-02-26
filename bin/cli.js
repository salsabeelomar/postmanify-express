#!/usr/bin/env node
const { program } = require("commander");
const { detectRoutes } = require("../src/scanner/route-detector");
const { parseRoutes } = require("../src/parser/express-parser");
const {
  generatePostmanCollection,
} = require("../src/generators/postman-generator");
const { loadConfig } = require("../src/utils/config-loader");
const { filterRoutes } = require("../src/utils/helpers");
const fs = require("fs");
const prettyError = require("pretty-error").start();

program
  .command("generate")
  .description("Generate Postman collection from Express routes")
  .option("-i, --input <file>", "Entry file (e.g., app.js)", "app.js")
  .option("-o, --output <file>", "Output JSON file", "postman-collection.json")
  .option("-e, --exclude <routes>", "Comma-separated routes to exclude")
  .option("--no-auth", "Skip authentication headers detection")
  .action((options) => {
    try {
      // Load configuration
      const config = loadConfig();

      // Merge CLI options with config file
      if (options.exclude) config.excludeRoutes = options.exclude.split(",");
      if (options.auth === false) config.detectAuth = false;

      // Core processing flow
      const { routes, appMiddlewares } = detectRoutes(options.input);
      const filteredRoutes = filterRoutes(routes, config);
      const parsedRoutes = parseRoutes(filteredRoutes, appMiddlewares, config);
      const collection = generatePostmanCollection(parsedRoutes, config);

      // Write output
      fs.writeFileSync(options.output, JSON.stringify(collection, null, 2));
      console.log(`✅ Collection generated at ${options.output}`);
      console.log(
        `ℹ️ ${routes.length} routes processed (${filteredRoutes.length} included)`
      );
    } catch (error) {
      console.error("\n❌ Error:", prettyError.render(error));
      process.exit(1);
    }
  });

program.parse();
