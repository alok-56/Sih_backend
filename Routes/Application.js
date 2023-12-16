const express = require("express");
const ApplicationRouter = express.Router();
const IsLogin = require("../Middleware/IsLogin");
const {
  CreateApplication,
  UpdateApplication,
  GetallapplicationCollge,
  GetallapplicationStage1,
  GetallapplicationStage2,
  GetallapplicationStage3,
  GetallVerfied,
  GetallApplicationCollegeverified,
} = require("../Controller/Application");
const IsCollege = require("../Middleware/Iscollege");
const IsGovt = require("../Middleware/IsGovt");

ApplicationRouter.route("/Apply/Schlorship").post(IsLogin, CreateApplication);
ApplicationRouter.route("/Update/Schlorship").put(UpdateApplication);
ApplicationRouter.route("/Get/Application/College").get(
  IsCollege,
  GetallapplicationCollge
);
ApplicationRouter.route("/Get/Application/Stage1").get(
  IsGovt,
  GetallapplicationStage1
);
ApplicationRouter.route("/Get/Application/Stage2").get(
  IsGovt,
  GetallapplicationStage2
);
ApplicationRouter.route("/Get/Application/Stage3").get(
  IsGovt,
  GetallapplicationStage3
);
ApplicationRouter.route("/Get/Application/verified").get(IsGovt, GetallVerfied);
ApplicationRouter.route("/Get/Application/college/pending").post(IsCollege,GetallApplicationCollegeverified);



module.exports = ApplicationRouter;
