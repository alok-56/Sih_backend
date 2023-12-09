const mongoose = require("mongoose");

const DigiLokerSchema = new mongoose.Schema({
  AdharNumber: {
    type: String,
  },
  PhoneNumber: {
    type: String,
  },
  Email: {
    type: String,
  },
  AdharCard: {
    type: String,
  },
  IncomeCertificate: {
    type: String,
  },
  CasteCertificate: {
    type: String,
  },
  RecedientCertificate: {
    type: String,
  },
  Marksheet: {
    type: String,
  },
});

const DigiLokerModel = mongoose.model("DigiLokerModel", DigiLokerSchema);
module.exports = DigiLokerModel;
