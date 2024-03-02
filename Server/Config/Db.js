const mongoose = require("mongoose");
const DB = mongoose
  .connect("mongodb://127.0.0.1:27017/Project")
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Unable to establish a connection", error));
module.exports = DB;
//db



