const AppErr = require("../Global/Error");
const VerifyToken = require("../Global/VerifyToken");
const GovtModel = require("../Model/Goverment");


const IsGovt = async (req, res, next) => {
  let decoded = VerifyToken(req.headers.token);
  req.user = decoded.id;
  if (!decoded) {
    return next(new AppErr("Invailed Token/Expired Token ", 404));
  }
  let userFound = await GovtModel.findById(decoded.id);
  if (!userFound) {
    return next(new AppErr("Invailed Token/Expired Token ", 404));
  }

  next();
};

module.exports = IsGovt;
