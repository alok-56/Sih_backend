const AppErr = require("../Global/Error");
const VerifyToken = require("../Global/VerifyToken");
const CollegeModel = require("../Model/College");


const IsCollege = async (req, res, next) => {
  let decoded = VerifyToken(req.headers.token)
  req.user = decoded.id; 
  if (!decoded) {
    return next(new AppErr("Invailed Token/Expired Token ", 404));
  }
  let userFound = await CollegeModel.findById(decoded.id);
  if (!userFound) {
    return next(new AppErr("Invailed Token/Expired Token ", 404));
  }

  next();
};

module.exports = IsCollege;
