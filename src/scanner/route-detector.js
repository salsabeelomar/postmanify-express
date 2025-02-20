const fs = require("fs");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function detectRoutes(entryFile) {
  if (!fs.existsSync(entryFile)) {
    throw new Error(`File not found: ${entryFile}`);
  }

  const code = fs.readFileSync(entryFile, "utf-8");

  try {
    ast = parse(code, {
      sourceType: "module",
      plugins: ["typescript"],
    });
  } catch (error) {
    throw new Error(`Parsing error: ${error.message}`);
  }

  const routes = [];

  traverse(ast, {
    CallExpression({ node }) {
      if (
        node.callee.object?.name === "app" &&
        ["get", "post", "put", "patch", "delete"].includes(
          node.callee.property?.name
        )
      ) {
        const method = node.callee.property.name.toUpperCase();
        const path = node.arguments[0]?.value;

        if (method && path) {
          routes.push({ method, path });
        }
      }
    },
  });

  return routes;
}

module.exports = { detectRoutes };
