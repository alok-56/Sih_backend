const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  Status: {
    type: String,
    default: "Pending",
  },
  collegeVerified: {
    type: String,
  },
  Stage1: {
    type: String,
  },
  Stage2: {
    type: String,
  },
  Stage3: {
    type: String,
  },
  StudentId: {
    type: String,
  },
  GovtId: {
    type: String,
  },
  CollegeId: {
    type: String,
  },
  SchlorshipId: {
    type: String,
  },
  StudentName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Phonenumber: {
    type: String,
  },
  State: {
    type: String,
  },
  District: {
    type: String,
  },
  Address: {
    type: String,
  },
  Year: {
    type: String,
  },
  CollegeName: {
    type: String,
  },
  CollegeEmail: {
    type: String,
  },
  CollegenNumber: {
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

const ApplicationModel = mongoose.model("Application", ApplicationSchema);
module.exports = ApplicationModel;
