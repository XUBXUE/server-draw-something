const mongoose = require("mongoose");
const MONGOURL = "mongodb://localhost:27017/drawSomething";

module.exports = (app) => {
  mongoose.connect(
    MONGOURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("mongodb connected");
    }
  );
};
