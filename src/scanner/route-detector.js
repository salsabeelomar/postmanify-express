const fs = require("fs");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function detectRoutes(entryFile) {
  if (!fs.existsSync(entryFile)) {
    throw new Error(`File not found: ${entryFile}`);
  }

  const code = fs.readFileSync(entryFile, "utf-8");
  let ast;
  try {
    ast = parse(code, {
      sourceType: "module",
      plugins: ["typescript"],
    });
  } catch (error) {
    throw new Error(`Parsing error: ${error.message}`);
  }

  const routes = [];
  const appMiddlewares = [];

  traverse(ast, {
    CallExpression({ node }) {
      // Detect global middlewares (app.use())
      if (
        node.callee.object?.name === "app" &&
        node.callee.property?.name === "use"
      ) {
        const middleware = node.arguments[0];
        if (middleware) {
          appMiddlewares.push({
            name: middleware.name || "anonymousMiddleware",
            code: code.slice(middleware.start, middleware.end),
          });
        }
      }

      // Detect route methods (app.get/post/put/etc)
      if (
        node.callee.object?.name === "app" &&
        ["get", "post", "put", "patch", "delete"].includes(
          node.callee.property?.name
        )
      ) {
        const method = node.callee.property.name.toUpperCase();
        const path = node.arguments[0]?.value;
        const middlewares = node.arguments
          .slice(1, -1) // Exclude path and final handler
          .map((arg) => ({
            name: arg.name || "anonymousMiddleware",
            code: code.slice(arg.start, arg.end),
          }));

        if (method && path) {
          routes.push({
            method,
            path,
            middlewares,
            handler: code.slice(
              // Store handler code for body detection
              node.arguments[node.arguments.length - 1].start,
              node.arguments[node.arguments.length - 1].end
            ),
          });
        }
      }
    },
  });

  return { routes, appMiddlewares, entryFile };
}

module.exports = { detectRoutes };
