const AppErr = require("../Global/Error");
const GenerateToken = require("../Global/GenerateToken");
const SendEmail = require("../Global/SendEmail");
const CollegeModel = require("../Model/College");
const otpGenerator = require("otp-generator");

//-----------------------Signup College--------------------------//

const SignUpCollege = async (req, res, next) => {
  try {
    let {
      Email,
      PhoneNumber,
      City,
      distict,
      State,
      Password,
      Landmark,
      CollgeName,
    } = req.body;

    //---------------CheckEmail-------------------//
    let UserFound = await CollegeModel.findOne({ Email: Email });
    let UserFound2 = await CollegeModel.findOne({ PhoneNumber: PhoneNumber });

    if (UserFound) {
      return next(new AppErr("Email Already in use", 404));
    }
    //---------------CheckNumber-------------------//
    if (UserFound2) {
      return next(new AppErr("PhoneNumber Already in use", 404));
    }

    let user = await CollegeModel.create(req.body);
    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return next(new AppErr(error.message), 500);
  }
};

//-----------------------Signin College---------------------------//

const SigninCollege = async (req, res, next) => {
  try {
    let { Email, Password } = req.body;
    //---------Check user-----------------//

    let userFound = await CollegeModel.findOne({ Email: Email });
    if (!userFound) {
      return next(new AppErr("User not found", 404));
    }
    console.log(userFound);

    if (userFound.Password != Password) {
      return next(new AppErr("Passwords do not match", 404));
    }

    //--------Token----------//

    let Token = GenerateToken(userFound._id);

    return res.status(200).json({
      status: "success",
      data: userFound,
      token: Token,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//----------------------Otp Verfification------------------------//
const OtpSendCtrlForCollege = async (req, res, next) => {
  try {
    let { Email } = req.body;
    if (!Email) {
      return next(new AppErr("Email required", 400));
    }

    let User = await CollegeModel.findOne({ Email: Email });
    if (!User) {
      return next(new AppErr("User not found", 500));
    }

    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    //---------Email Send---------------//
    SendEmail(Email, otp)
      .then((response) => {
        return res.status(200).json({
          staus: "success",
          otp: otp,
        });
      })
      .catch((error) => {
        return next(new AppErr(error.message, 500));
      });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------------Upload Documents------------------------//

const UpdateDocuments = async (req, res, next) => {
  try {
    let user = await CollegeModel.findById(req.user);
    if (!user) {
      return next(new AppErr("User not found", 404));
    }
    let { CollegProve, AicteDoc, UgcDoc } = req.body;
    let updateDoc = await CollegeModel.findByIdAndUpdate(
      req.user,
      { CollegProve: CollegProve, AicteDoc: AicteDoc, UgcDoc: UgcDoc },
      { new: true }
    );

    return res.status(200).json({
      staus: "success",
      data: updateDoc,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//----------------------Get own Detils-----------------------------//

module.exports = {
  SignUpCollege,
  SigninCollege,
  OtpSendCtrlForCollege,
};
