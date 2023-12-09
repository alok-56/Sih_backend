const AdharCardModel = require("../Model/AdharCard");
const DigiLokerModel = require("../Model/DigiLocker");
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

module.exports = {
  SaveDigilocker,
  SaveadharCard,
};
