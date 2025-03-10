const { parseRoutes } = require("../src/parser/express-parser");
const { filterRoutes } = require("../src/utils/helpers");

describe("Route Parsing", () => {
  it("should detect JWT auth headers", () => {
    const routes = [
      {
        method: "GET",
        path: "/secret",
        middlewares: [
          "(req, res) => { res.set('Authorization', 'Bearer token'); }",
        ],
        handler:
          "(req, res) => { res.set('Authorization', 'Bearer {{token}}'); res.send('Secret'); }",
      },
    ];

    // ✅ Pass config object with detectAuth property
    const parsed = parseRoutes(routes, [{ code: "checkAdmin" }], {
      detectAuth: true,
    });

    expect(parsed[0].request.headers).toEqual(
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
