const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
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
  Password:{
    type:String
  },
  Landmark: {
    type: String,
  },
  CollgeName: {
    type: String,
  },
  Application: {
    type: Array,
  },
  VerfiedApplication: {
    type: Array,
  },
  Tickets: {
    type: Array,
  },
  CollegProve: {
    type: String,
  },
  AicteDoc: {
    type: String,
  },
  UgcDoc: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  VerfiedState: {
    type: Array,
  },
});

const CollegeModel = mongoose.model("College", CollegeSchema);
module.exports = CollegeModel;
