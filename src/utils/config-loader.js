const fs = require("fs");
const path = require("path");

const DEFAULT_CONFIG = {
  excludeRoutes: [],
  includeTests: false,
  authHeader: "Authorization",
};

function loadConfig() {
  try {
    const rcPath = path.join(process.cwd(), ".postmanifyrc");
    const userConfig = JSON.parse(fs.readFileSync(rcPath, "utf-8"));
    return { ...DEFAULT_CONFIG, ...userConfig };
  } catch (error) {
    return DEFAULT_CONFIG;
  }
}

module.exports = { loadConfig };
