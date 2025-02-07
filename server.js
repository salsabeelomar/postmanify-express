const http = require("http");
const main = require("./main");

const server = http.createServer(main);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
