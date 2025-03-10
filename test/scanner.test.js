const path = require("path");
const { detectRoutes } = require("../src/scanner/route-detector");
const fs = require("fs");

describe("detectRoutes function", () => {
  // const testFilePath = path.join(__dirname, "../examples/demo-app.js");
  const testFilePath = path.join(__dirname, "../examples/demo-routes.js");

  beforeAll(() => {
    if (!fs.existsSync(testFilePath)) {
      throw new Error(`Test file not found: ${testFilePath}`);
    }
  });

  it("should detect all routes correctly", () => {
    const { routes } = detectRoutes(testFilePath); // Destructure routes
    expect(routes).toEqual(
      expect.arrayContaining([
        {
          method: "GET",
          path: "/home",
          middlewares: [],
          handler: expect.any(String),
        },
        {
          method: "POST",
          path: "/users",
          middlewares: [],
          handler: expect.any(String),
        },
        {
          method: "DELETE",
          path: "/users/:id",
          middlewares: [],
          handler: expect.any(String),
        },
        {
          method: "PATCH",
          path: "/users/:id",
          middlewares: [],
          handler: expect.any(String),
        },
        {
          method: "PUT",
          path: "/users/:id",
          middlewares: [],
          handler: expect.any(String),
        },
      ])
    );
  });

  it("should return an empty array if no routes exist", () => {
    const emptyFilePath = path.join(__dirname, "../examples/empty-app.js");
    fs.writeFileSync(emptyFilePath, "");

    const { routes } = detectRoutes(emptyFilePath); // Destructure routes
    expect(routes).toEqual([]);

    fs.unlinkSync(emptyFilePath);
  });

  it("should throw an error if the file does not exist", () => {
    const nonExistentPath = path.join(__dirname, "../non-existent.js");
    expect(() => detectRoutes(nonExistentPath)).toThrow("File not found:");
  });

  it("should throw an error if the file has invalid syntax", () => {
    const invalidFilePath = path.join(__dirname, "../examples/invalid-app.js");
    fs.writeFileSync(invalidFilePath, "invalid code $$ %%");

    expect(() => detectRoutes(invalidFilePath)).toThrow("Parsing error:");

    fs.unlinkSync(invalidFilePath);
  });
});
