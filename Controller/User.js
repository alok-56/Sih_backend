const { validationResult } = require("express-validator");
const AppErr = require("../Global/Error");
const AdharCardModel = require("../Model/AdharCard");
const UserModel = require("../Model/User");
const GenerateToken = require("../Global/GenerateToken");
const DigiLokerModel = require("../Model/DigiLocker");
const SendEmail = require("../Global/SendEmail");
const otpGenerator = require("otp-generator");

//---------------------------Login User with AdharCard-------------------------//
const LoginWithAdhar = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return next(new AppErr(error.array()[0].msg, 406));
    }

    let { AdharNumber } = req.body;
    if (!AdharNumber) {
      return next(new AppErr("AdharCard is required", 404));
    }

    let userFound = await UserModel.findOne({ AdharCardNumber: AdharNumber });
    if (userFound === null) {
      let userDetails = await AdharCardModel.find({ AdharNumber: AdharNumber });
      let user = await UserModel.create({
        Name: userDetails[0].Name,
        Email: userDetails[0].Email,
        PhoneNumber: userDetails[0].Number,
        City: userDetails[0].City,
        distict: userDetails[0].distict,
        State: userDetails[0].State,
        Landmark: userDetails[0].Landmark,
        LoginType: "Adharcard",
        AdharCardNumber: AdharNumber,
      });
      let token = GenerateToken(user._id.toString());
      return res.status(200).json({
        status: "success",
        data: user,
        token: token,
      });
    } else {
      let updateUser = await UserModel.findByIdAndUpdate(
        userFound._id.toString(),
        {
          AdharCard: "",
          IncomeCertificate: "",
          RecidentCertificate: "",
          CasteCertificate: "",
          Marksheet: "",
        },
        { new: true }
      );
      let token = GenerateToken(userFound._id.toString());
      return res.status(200).json({
        message: "Success",
        data: updateUser,
        token: token,
      });
    }
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//--------------------------Login user with DigiLocker------------------------//
const LoginWithDigiLocker = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return next(new AppErr(error.array()[0].msg, 406));
    }

    let { AdharNumber } = req.body;
    if (!AdharNumber) {
      return next(new AppErr("AdharCard is required", 404));
    }

    let userFound = await UserModel.findOne({ AdharCardNumber: AdharNumber });
    if (userFound === null) {
      let userDetails = await DigiLokerModel.find({ AdharNumber: AdharNumber });
      let user = await UserModel.create({
        Name: userDetails[0].Name,
        Email: userDetails[0].Email,
        PhoneNumber: userDetails[0].PhoneNumber,
        City: userDetails[0].City,
        distict: userDetails[0].distict,
        State: userDetails[0].State,
        Landmark: userDetails[0].Landmark,
        LoginType: "DigiLocker",
        AdharCardNumber: AdharNumber,
        AdharCard: userDetails[0].AdharCard,
        IncomeCertificate: userDetails[0].IncomeCertificate,
        RecidentCertificate: userDetails[0].RecedientCertificate,
        CasteCertificate: userDetails[0].CasteCertificate,
        Marksheet: userDetails[0].Marksheet,
      });
      let token = GenerateToken(user._id.toString());
      return res.status(200).json({
        status: "success",
        data: user,
        token: token,
      });
    } else {
      let userDetails = await DigiLokerModel.find({ AdharNumber: AdharNumber });
      let updateUser = await UserModel.findByIdAndUpdate(
        userFound._id.toString(),
        {
          AdharCard: userDetails[0].AdharCard,
          IncomeCertificate: userDetails[0].IncomeCertificate,
          RecidentCertificate: userDetails[0].RecedientCertificate,
          CasteCertificate: userDetails[0].CasteCertificate,
          Marksheet: userDetails[0].Marksheet,
        },
        { new: true }
      );
      let token = GenerateToken(userFound._id.toString());
      return res.status(200).json({
        message: "Success",
        data: updateUser,
        token: token,
      });
    }
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//--------------------------Otp Send-----------------------------//

const OtpSendCtrlForAdhar = async (req, res, next) => {
  try {
    let { AdharNumber } = req.body;
    if (!AdharNumber) {
      return next(new AppErr("Adhar number required", 400));
    }

    let User = await AdharCardModel.findOne({ AdharNumber: AdharNumber });
    if (!User) {
      return next(new AppErr("User not found"));
    }

    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    console.log(User.Email);
    //---------Email Send---------------//
    SendEmail(User.Email, otp)
      .then((response) => {
        return res.status(200).json({
          staus: "success",
          otp: otp,
        });
      })
      .catch((err) => {
        return next(new AppErr(err, 500));
      });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//--------------------------Get Otp Digilocker------------------------------//

const getOtpDigilocker = async (req, res, next) => {
  try {
    let { AdharNumber } = req.body;
    if (!AdharNumber) {
      return next(new AppErr("Adhar number required", 400));
    }

    let User = await DigiLokerModel.findOne({ AdharNumber: AdharNumber });
    console.log(User)
    if (!User) {
      return next(new AppErr("User not found"));
    }

    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    console.log(User.Email);
    //---------Email Send---------------//
    SendEmail(User.Email, otp)
      .then((response) => {
        return res.status(200).json({
          staus: "success",
          otp: otp,
        });
      })
      .catch((err) => {
        return next(new AppErr(err, 500));
      });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//----------------------------GetOwnProfile----------------------------------//

const getOwnProfile = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.user);
    return res.status(200).json({
      staus: "success",
      data: user,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  LoginWithAdhar,
  LoginWithDigiLocker,
  OtpSendCtrlForAdhar,
  getOwnProfile,
  getOtpDigilocker
};
