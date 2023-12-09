const mongoose = require("mongoose");

const DbConnect = () => {
  mongoose
    .connect("mongodb+srv://developer:uJhPp8IX3x3BMLKl@cluster0.scdi72u.mongodb.net/?retryWrites=true&w=majority")
    .then((res) => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = DbConnect;
