const mongoose = require("mongoose");

const GovtSchema = new mongoose.Schema({
  StateName: {
    type: String,
  },
  Email: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  Application: {
    type: Array,
  },
  College: {
    type: Array,
  },
  VerfiedCollege: {
    type: Array,
  },
  Stage1: {
    type: Array,
  },
  Stage2: {
    type: Array,
  },
  FinalStage: {
    type: Array,
  },
  VerfiedApplication: {
    type: Array,
  },
});

const GovtModel = mongoose.model("Govt", GovtSchema);
module.exports = GovtModel;
