function generatePostmanCollection(routes) {
    return {
      info: {
        name: "Generated API Collection",
        schema:
          "https://schema.postman.com/json/collection/v2.1.0/collection.json",
      },
      item: routes.map((route) => ({
        name: route.name,
        request: {
          method: route.request.method,
          url: {
            raw: route.request.url,
            host: ["{{base_url}}"],
            path: route.request.path
              ? route.request.path.split("/").filter(Boolean)
              : [], 
          },
          header: route.request.header,
        },
      })),
    };
  }
  module.exports = { generatePostmanCollection };