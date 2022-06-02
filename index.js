const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.static(path.resolve(__dirname, "static")));
app.use(bodyParser.json());
app.get("/", (req, res) => {});

app.post("/api/register", (req, res) => {
  console.log("hello");
  res.end();
});

app.listen(4000, () => {
  console.log("app is running on port 4000");
});
