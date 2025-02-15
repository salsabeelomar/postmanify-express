#!/usr/bin/env node
const { program } = require("commander");
const { detectRoutes } = require("../src/scanner/route-detector");
const { parseRoutes } = require("../src/parser/express-parser");
const {
  generatePostmanCollection,
} = require("../src/generators/postman-generator");
const fs = require("fs");

program
  .command("generate")
  .description("Generate Postman collection from Express routes")
  .option("-i, --input <file>", "Entry file (e.g., app.js)", "app.js")
  .option("-o, --output <file>", "Output JSON file", "postman-collection.json")
  .action((options) => {
    const routes = detectRoutes(options.input);
    const parsed = parseRoutes(routes);
    const collection = generatePostmanCollection(parsed);

    fs.writeFileSync(options.output, JSON.stringify(collection, null, 2));
    console.log(`✅ Collection generated at ${options.output}`);
  });

program.parse();