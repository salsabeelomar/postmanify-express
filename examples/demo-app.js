const express = require("express");
const app = express();
require("dotenv").config();

app.get("/users", (req, res) => res.send("Hello World"));
app.post("/users", (req, res) => res.send("User created"));

app.listen(process.env.PORT, () =>
  console.log(`server is running on http://localhost:${process.env.PORT}`)
);
