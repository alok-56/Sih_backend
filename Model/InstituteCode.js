const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  InstituteCode: {
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
  VerfiedStateId: {
    type: Array,
  },
  VerfiedState: {
    type: Array,
  },
});

const InstitudeDummyModel = mongoose.model("InstitudeDummy", InstituteSchema);
module.exports = InstitudeDummyModel;
