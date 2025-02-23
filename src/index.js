const { detectRoutes } = require("./scanner/route-detector");
const { parseRoutes } = require("./parser/express-parser");
const { generatePostmanCollection } = require("./generators/postman-generator");
const { filterRoutes } = require("./utils/helpers"); // Ensure this line is correct
const fs = require("fs");

function generateCollection(entryFile, outputFile = "postman-collection.json") {
  // 1. Detect routes
  const { routes, appMiddlewares } = detectRoutes(entryFile);

  // 2. Filter routes (if needed)
  const filteredRoutes = filterRoutes(routes, { excludeRoutes: [] }); // Example config

  // 3. Parse routes
  const parsedRoutes = parseRoutes(filteredRoutes, appMiddlewares);

  // 4. Generate Postman collection
  const collection = generatePostmanCollection(parsedRoutes);

  // 5. Save to file
  fs.writeFileSync(outputFile, JSON.stringify(collection, null, 2));
}

module.exports = { generateCollection };
