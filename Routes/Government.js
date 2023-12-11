const express = require("express");
const {
  SignupGovenment,
  LoginGovernment,
  CreateSchlorship,
  GetOwnSchlorship,
  GetSingleSchlorship,
  GetAllCollege,
  VerifyCollege,
  GetAllownVerifiedcollege,
  GetAllSchlorship,
  GetSingleSchlorshipbyAll,
} = require("../Controller/Government");
const IsLogin = require("../Middleware/IsGovt");
const IsGovt = require("../Middleware/IsGovt");
const GovermentRouter = express.Router();

GovermentRouter.route("/Signup").post(SignupGovenment);
GovermentRouter.route("/Signin").post(LoginGovernment);
GovermentRouter.route("/CreateSchlorship").post(IsGovt, CreateSchlorship);
GovermentRouter.route("/getOwnSchlorship").get(IsGovt, GetOwnSchlorship);
GovermentRouter.route("/getSingleSchlorship/:id").get(
  IsGovt,
  GetSingleSchlorship
); 
GovermentRouter.route("/getAllcollege").get(IsGovt,GetAllCollege)
GovermentRouter.route("/VerifyCollege").post(IsGovt,VerifyCollege)
GovermentRouter.route("/Verified/College").get(IsGovt,GetAllownVerifiedcollege)
GovermentRouter.route("/AllSchlorship").get(GetAllSchlorship)
GovermentRouter.route("/AllSchlorship/:id").get(GetSingleSchlorshipbyAll)
module.exports = GovermentRouter;