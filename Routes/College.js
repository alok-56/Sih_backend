const express = require("express");
const {
  SignUpCollege,
  SigninCollege,
  OtpSendCtrlForCollege,
} = require("../Controller/College");
const CollegeRouter = express.Router();

CollegeRouter.route("/Signup").post(SignUpCollege);
CollegeRouter.route("/Login").post(SigninCollege);
CollegeRouter.route("/OtpSend").post(OtpSendCtrlForCollege);

module.exports = CollegeRouter;
