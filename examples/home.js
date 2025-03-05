const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/home", (req, res) => res.status(200).send("Hello World"));


// Start server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`server is running on http://localhost:${PORT}`)
  );
}

module.exports = app;
