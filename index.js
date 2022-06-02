const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcryptjs");
const connection = require("./config");
const User = require("./model/user");

const app = express();

app.use(express.static(path.resolve(__dirname, "static")));
app.use(bodyParser.json());
app.get("/", (req, res) => {});

app.post("/api/register", async (req, res) => {
  const { username, password: plainPassword } = req.body;
  if (username && plainPassword) {
    const password = await bcrypt.hash(plainPassword, 10);

    try {
      const response = User.create({
        username,
        password,
      });
      res.json({ status: "ok" });
    } catch (error) {
      res.json({ status: "error" });
    }
  }
});

app.listen(4000, () => {
  console.log("app is running on port 4000");
});
