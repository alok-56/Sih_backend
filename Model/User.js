const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: {
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
  LoginType: {
    type: String,
  },
  Application: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
  Tickets: {
    type: Array,
  },
  AdharCardNumber: {
    type: String,
  },
  AdharCard: {
    type: String,
  },
  IncomeCertificate: {
    type: String,
  },
  RecidentCertificate: {
    type: String,
  },
  CasteCertificate: {
    type: String,
  },
  Bonafite: {
    type: String,
  },
  Marksheet: {
    type: String,
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
