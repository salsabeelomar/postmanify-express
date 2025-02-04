const http = require("http");
const main = require("./main");

const server = http.createServer(main);


server.listen(5000, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});