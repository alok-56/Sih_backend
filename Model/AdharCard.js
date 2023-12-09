const mongoose = require("mongoose");

const AdharCardSchema = new mongoose.Schema({
  AdharNumber: {
    type: String,
  },
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Number: {
    type: String,
  },
  City: {
    type: String,
  },
  distict: {
    type: String,
  },
  State: {
    type: String,
  },
  Landmark: {
    type: String,
  },
});

const AdharCardModel = mongoose.model("AdharCardModel", AdharCardSchema);
module.exports = AdharCardModel;
