function parseRoutes(routes, appMiddlewares = [], config) {
  console.log(config);

  return routes.map((route) => {
    const request = {
      method: route.method,
      url: `{{base_url}}${route.path}`,
      headers:
        config.detectAuth === false
          ? []
          : detectHeaders(route.handler, appMiddlewares),
      query: detectQueryParams(route.path),
      body: detectRequestBody(route.middlewares, route.handler),
    };

    return { name: `${route.method} ${route.path}`, request };
  });
}

function detectQueryParams(path) {
  const queryParams = [];
  const queryRegex = /[?&]([^=]+)=([^&]+)/g;
  let match;

  while ((match = queryRegex.exec(path))) {
    queryParams.push({ key: match[1], value: match[2] });
  }
  return queryParams;
}

function detectHeaders(routeMiddlewares, appMiddlewares) {
  const allMiddlewares = Array.isArray(routeMiddlewares)
    ? routeMiddlewares
    : [routeMiddlewares];
  const headers = [];

  allMiddlewares.forEach((middleware) => {
    if (typeof middleware === "string") {
      middleware = new Function("req", "res", middleware);
    }

    if (typeof middleware === "function") {
      const middlewareCode = middleware.toString();
      if (
        middlewareCode.includes("res.set") ||
        middlewareCode.includes("res.header")
      ) {
        if (middlewareCode.includes("Authorization")) {
          headers.push({ key: "Authorization", value: "Bearer {{token}}" });
        }

        if (middlewareCode.includes("Access-Control-Expose-Headers")) {
          headers.push({
            key: "Access-Control-Expose-Headers",
            value: "Authorization",
          });
        }
      }
    }
  });

  return headers;
}

function detectRequestBody(middlewares, handlerCode) {
  const hasBodyParser = middlewares.some(
    (middleware) =>
      middleware.code.includes("express.json()") ||
      middleware.code.includes("express.urlencoded()")
  );
  const usesRequestBody = handlerCode.includes("req.body");

  return hasBodyParser && usesRequestBody
    ? { mode: "raw", raw: "{{request_body}}" }
    : null;
}

module.exports = { parseRoutes, detectHeaders };
