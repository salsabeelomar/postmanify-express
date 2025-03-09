function generatePostmanCollection(routes) {
  return {
    info: {
      name: "Generated API Collection",
      schema:
        "https://schema.postman.com/json/collection/v2.1.0/collection.json",
    },
    item: routes.map((route) => {
      const urlWithoutBase = route.request.url.replace("{{base_url}}", "");
      return {
        name: route.name,
        request: {
          method: route.request.method,
          url: {
            raw: route.request.url,
            host: ["{{base_url}}"],
            path: urlWithoutBase.split("/").filter(Boolean),
          },
          headers: route.request.headers,
          body:
            ["POST", "PUT", "PATCH"].includes(route.request.method) &&
            route.request.body
              ? {
                  mode: "raw",
                  raw: JSON.stringify(route.request.body, null, 2),
                  options: {
                    raw: { language: "json" },
                  },
                }
              : undefined,
        },
      };
    }),
  };
}

module.exports = { generatePostmanCollection };
