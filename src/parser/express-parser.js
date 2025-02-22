function parseRoutes(routes, appMiddlewares = []) {
  return routes.map(route => {
    const request = {
      method: route.method,
      url: {{base_url}}${route.path},
      path: route.path,
      header: detectHeaders(route.middlewares, appMiddlewares),
      query: detectQueryParams(route.path),
      body: detectRequestBody(route.middlewares),
    };
    return { name: ${route.method} ${route.path}, request };
  });
}

// Helper: Detect headers from middleware (e.g., Authorization)
function detectHeaders(routeMiddlewares, appMiddlewares) {
  const allMiddlewares = [...appMiddlewares, ...routeMiddlewares];
  const headers = [];

  allMiddlewares.forEach(middleware => {
    // Detect JWT middleware pattern
    if (middleware.toString().includes('req.headers.authorization')) {
      headers.push({ key: 'Authorization', value: 'Bearer {{token}}' });
    }
  });
  return headers;
}

// Helper: Extract query params from path (e.g., /users?name=:name)
function detectQueryParams(path) {
  const queryParams = [];
  const queryRegex = /[?&]([^=]+)=([^&]+)/g;
  let match;
  
  while ((match = queryRegex.exec(path))) {
    queryParams.push({ key: match[1], value: match[2] });
  }
  return queryParams;
}

// Helper: Detect request body usage
function detectRequestBody(middlewares) {
  const hasBodyParser = middlewares.some(middleware => 
    middleware.name === 'json' || middleware.name === 'urlencoded'
  );
  return hasBodyParser ? { mode: 'raw', raw: '{{request_body}}' } : null;
}
