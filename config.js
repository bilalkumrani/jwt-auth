const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/auth-app");

const db = mongoose.connection;

db.on("error", () => console.log("there is an error in db connection"));

db.once("open", () => console.log("successfully connected to the database"));
