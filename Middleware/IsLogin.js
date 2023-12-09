const AppErr = require("../Global/Error");
const VerifyToken = require("../Global/VerifyToken");
const UserModel = require("../Model/User");

const IsLogin = async (req, res, next) => {
  let decoded = VerifyToken(req.headers.token)
  console.log(decoded);
  req.user = decoded.id; 
  if (!decoded) {
    return next(new AppErr("Invailed Token/Expired Token ", 404));
  }
  let userFound = await UserModel.findById(decoded.id);
  if (!userFound) {
    return next(new AppErr("Invailed Token/Expired Token ", 404));
  }

  next();
};

module.exports = IsLogin;
