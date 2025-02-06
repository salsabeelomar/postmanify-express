const fs = require("fs");
const path = require("path");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

// Scans Express code and detects route definitions
function detectRoutes(entryFile) {
  const routes = [];
  const code = fs.readFileSync(entryFile, "utf-8");

  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  traverse(ast, {
    CallExpression({ node }) {
      if (
        node.callee.object?.name === "app" ||
        node.callee.object?.property?.name === "router"
      ) {
        const method = node.callee.property.name; // e.g., "get", "post"
        const path = node.arguments[0]?.value; // e.g., "/api/users"

        if (method && path) {
          routes.push({ method: method.toUpperCase(), path });
        }
      }
    },
  });

  return routes;
}

module.exports = { detectRoutes };
