const AppErr = require("../Global/Error");
const AdharCardModel = require("../Model/AdharCard");
const DigiLokerModel = require("../Model/DigiLocker");
const InstitudeDummyModel = require("../Model/InstituteCode");
//------------------------Save Digilocker-----------------------------//

const SaveDigilocker = async (req, res) => {
  let {
    AdharNumber,
    PhoneNumber,
    Email,
    AdharCard,
    IncomeCertificate,
    CasteCertificate,
    RecedientCertificate,
    Marksheet,
  } = req.body;

  let data = await DigiLokerModel.create(req.body);
  res.status(200).json({
    status: "success",
    data: data,
  });
};

//-------------------------Save AdharCard----------------------------//
const SaveadharCard = async (req, res) => {
  let { AdharNumber, Name, Email, Number, City, distict, State, Landmark } =
    req.body;

  let data = await AdharCardModel.create(req.body);
  res.status(200).json({
    status: "success",
    data: data,
  });
};

const SaveDummyInstitute = async (req, res, next) => {
  try {
    let {
      Email,
      PhoneNumber,
      City,
      distict,
      State,
      Landmark,
      CollgeName,
      CollegProve,
      AicteDoc,
      UgcDoc,
      InstituteCode
    } = req.body;

    let data = await InstitudeDummyModel.create(req.body);
    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    return next(new AppErr(error.message), 500);
  }
};

module.exports = {
  SaveDigilocker,
  SaveadharCard,
  SaveDummyInstitute,
};
