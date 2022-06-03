const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcryptjs");
const connection = require("./config");
const User = require("./model/user");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const app = express();
const jwt_secret = "kaljsfdkfjlskdjf###444";

app.use(express.static(path.resolve(__dirname, "static")));
app.use(bodyParser.json());

app.post("/api/changepassword", async (req, res) => {
  const { token, password: newPassword } = req.body;

  try {
    const user = jwt.verify(token, jwt_secret);
    const _id = user.id;
    const password = await bcrypt.hash(newPassword, 10);
    console.log(password);
    await User.updateOne(
      { _id },
      {
        $set: { password },
      }
    );

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "token signature failure" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password: plainPassword } = req.body;
  if (username && plainPassword) {
    try {
      const user = await User.findOne({ username }).lean();

      if (!user)
        return res.json({
          status: "error",
          error: "invalid username/password",
        });
      if (await bcrypt.compare(plainPassword, user.password)) {
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
          },
          jwt_secret
        );
        res.json({ status: "ok", data: token });
      }
    } catch (error) {
      res.json({ status: "error" });
    }
  }
});

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
