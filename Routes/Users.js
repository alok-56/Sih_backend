const express = require("express");
const {
  LoginWithAdhar,
  LoginWithDigiLocker,
  OtpSendCtrlForAdhar,
  getOwnProfile,
  getOtpDigilocker,
} = require("../Controller/User");
const IsLogin = require("../Middleware/IsLogin");
const UserRouter = express.Router();

UserRouter.route("/Adhar/Login").post(LoginWithAdhar);
UserRouter.route("/DigiLocker/Login").post(LoginWithDigiLocker);
UserRouter.route("/OtpSend").post(OtpSendCtrlForAdhar);
UserRouter.route("/digilocker/OtpSend").post(getOtpDigilocker);
UserRouter.route("/ownProfile").get(IsLogin, getOwnProfile);

module.exports = UserRouter;
