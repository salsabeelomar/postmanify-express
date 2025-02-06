function parseRoutes(routes) {
    return routes.map((route) => ({
      name: `${route.method} ${route.path}`,
      request: {
        method: route.method,
        url: `{{base_url}}${route.path}`, // Ensure path is included
        path: route.path, // Add this line
        header: [],
        body: {},
      },
    }));
  }
  
  module.exports = { parseRoutes };