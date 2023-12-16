const express = require("express");
const {
  SignUpCollege,
  SigninCollege,
  OtpSendCtrlForCollege,
  UpdateDocuments,
  GetOwnDetails,
  LoginwithAcise,
  SendOtpAcicee,
} = require("../Controller/College");
const IsLogin = require("../Middleware/IsLogin");
const IsCollege = require("../Middleware/Iscollege");
const CollegeRouter = express.Router();

CollegeRouter.route("/Signup").post(SignUpCollege);
CollegeRouter.route("/Login").post(SigninCollege);
CollegeRouter.route("/OtpSend").post(OtpSendCtrlForCollege);
CollegeRouter.route("/UpdateDoc").put(IsCollege, UpdateDocuments);
CollegeRouter.route("/GetDetails").get(IsCollege,GetOwnDetails);
CollegeRouter.route("/Login/aciee").post(LoginwithAcise);
CollegeRouter.route("/otp/aciee").post(SendOtpAcicee);

module.exports = CollegeRouter;
