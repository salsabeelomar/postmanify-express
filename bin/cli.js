#!/usr/bin/env node
const { program } = require("commander");
const { detectRoutes } = require("../src/scanner/route-detector");
const { parseRoutes } = require("../src/parser/express-parser");
const {
  generatePostmanCollection,
} = require("../src/generators/postman-generator");
const { loadConfig } = require("../src/utils/config-loader");

const fs = require("fs");
const prettyError = require("pretty-error").start();

program
  .command("generate")
  .description("Generate Postman collection from Express routes")
  .option("-e, --exclude [<routes>]", "Comma-separated routes to exclude")
  .option("-i, --input <file>", "Entry file (e.g., app.js)", "app.js")
  .option("-o, --output <file>", "Output JSON file", "postman-collection.json")
  .option("--no-auth", "Skip authentication headers detection")
  .action((options) => {
    try {
      const config = loadConfig();
      if (options.exclude) {
        config.excludeRoutes = options.exclude
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map((route) => route.trim().replace(/^--/, ""));
      }
      if (options.auth === false) config.detectAuth = false;

      const { routes, appMiddlewares } = detectRoutes(options.input);

      const filteredRoutes = routes.filter(
        (route) =>
          !config.excludeRoutes.some(
            (excludeRoute) =>
              JSON.stringify(excludeRoute) === JSON.stringify(route.path)
          )
      );


      const parsedRoutes = parseRoutes(filteredRoutes, appMiddlewares, config);
      const collection = generatePostmanCollection(parsedRoutes, config);

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
