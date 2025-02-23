const _ = require("lodash");

function filterRoutes(routes, config) {
  return _.reject(routes, (route) => config.excludeRoutes.includes(route.path));
}

module.exports = { filterRoutes };
