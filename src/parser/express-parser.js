function parseRoutes(routes, appMiddlewares = []) {
  return routes.map((route) => {
    const request = {
      method: route.method,
      url: `{{base_url}}${route.path}`,
      header: detectHeaders(route.middlewares, appMiddlewares),
      query: detectQueryParams(route.path),
      body: detectRequestBody(route.middlewares, route.handler),
    };
    return { name: `${route.method} ${route.path}`, request };
  });
}

function detectHeaders(routeMiddlewares, appMiddlewares) {
  const allMiddlewares = [...appMiddlewares, ...routeMiddlewares];
  const headers = [];

  allMiddlewares.forEach((middleware) => {
    if (middleware.code.includes("req.headers.authorization")) {
      headers.push({ key: "Authorization", value: "Bearer {{token}}" });
    }
  });
  return headers;
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

module.exports = { parseRoutes };
