const path = require("path");
const { detectRoutes } = require("../src/scanner/route-detector"); // Import the function
const fs = require("fs");

describe("detectRoutes function", () => {
  const testFilePath = path.join(__dirname, "../examples/demo-app.js");

  beforeAll(() => {
    if (!fs.existsSync(testFilePath)) {
      throw new Error(`Test file not found: ${testFilePath}`);
    }
  });

  it("should detect all routes correctly", () => {
    const routes = detectRoutes(testFilePath);
    expect(routes).toEqual(
      expect.arrayContaining([
        { method: "GET", path: "/home" },
        { method: "POST", path: "/users" },
        { method: "DELETE", path: "/users/:id" },
        { method: "PATCH", path: "/users/:id" },
        { method: "PUT", path: "/users/:id" },
      ])
    );
  });

  it("should return an empty array if no routes exist", () => {
    const emptyFilePath = path.join(__dirname, "../examples/empty-app.js");
    fs.writeFileSync(emptyFilePath, "");

    const routes = detectRoutes(emptyFilePath);
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
