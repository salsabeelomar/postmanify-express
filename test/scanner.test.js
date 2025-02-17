const { detectRoutes } = require("../src/scanner/route-detector");
const { expect } = require("chai");

describe("Route Detection", () => {
  it("should detect GET /users route", () => {
    const routes = detectRoutes("./test/test-app.js");
    expect(routes).to.deep.include({ method: "GET", path: "/users" });
  });
});