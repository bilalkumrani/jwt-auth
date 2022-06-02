const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
    },
  },
  { collection: "user" }
);
const model = mongoose.model("userSchema", userSchema);
module.exports = model;
