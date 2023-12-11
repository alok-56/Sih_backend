const mongoose = require("mongoose");

const SchlorshipSchma = new mongoose.Schema({
  SchlorshipName: {
    type: String,
  },
  State: {
    type: String,
  },
  Deadline: {
    type: String,
  },
  Description: {
    type: String,
  },
  Type: {
    type: String,
  },
  governmentId:{
    type:String
  },
  Application: {
    type: Array,
  },
});

const SchlorshipModel = mongoose.model("Schlorship", SchlorshipSchma);
module.exports = SchlorshipModel;
