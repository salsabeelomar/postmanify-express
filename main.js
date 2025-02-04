const express = require("express");
const compression = require("compression");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
