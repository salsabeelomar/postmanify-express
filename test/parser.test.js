const { parseRoutes } = require("../src/parser/express-parser");
const { filterRoutes } = require("../src/utils/helpers");

describe("Route Parsing", () => {
  it("should detect JWT auth headers", () => {
    const routes = [
      {
        method: "GET",
        path: "/secret",
        middlewares: [{ code: "req.headers.authorization" }],
      },
    ];
    const parsed = parseRoutes(routes, [{ code: "checkAdmin" }]);
    expect(parsed[0].request.header).toEqual(
      expect.arrayContaining([
        { key: "Authorization", value: "Bearer {{token}}" },
      ])
    );
  });

  it("should exclude routes via config", () => {
    const routes = [{ path: "/health" }, { path: "/users" }];
    const filtered = filterRoutes(routes, { excludeRoutes: ["/health"] });
    expect(filtered).toHaveLength(1);
  });
});
