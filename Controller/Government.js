const AppErr = require("../Global/Error");
const GenerateToken = require("../Global/GenerateToken");
const CollegeModel = require("../Model/College");
const GovtModel = require("../Model/Goverment");
const SchlorshipModel = require("../Model/Schlorship");
const UserModel = require("../Model/User");

//--------------Signup college----------------//

const SignupGovenment = async (req, res, next) => {
  try {
    let { State, Email, PhoneNumber, Password } = req.body;
    //-------Check Email---------------//
    let EmailFound = await GovtModel.find({ Email: Email });
    console.log(EmailFound);
    if (EmailFound.length > 0) {
      return next(new AppErr("Email already exists", 404));
    }
    //-----------Chcek PhoneNumber---------------//
    let PhoneNumberFound = await GovtModel.find({ PhoneNumber: PhoneNumber });
    if (PhoneNumberFound.length > 0) {
      return next(new AppErr("Phone number already exists", 404));
    }

    let user = await GovtModel.create(req.body);
    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-------------------Login government-------------------//

const LoginGovernment = async (req, res, next) => {
  try {
    let { Email, Password } = req.body;
    let EmailFound = await GovtModel.findOne({ Email: Email });
    if (!EmailFound) {
      return next(new AppErr("USER  not found", 404));
    }
    let PasswordFound = await GovtModel.findOne({ Password: Password });
    if (!PasswordFound) {
      return next(new AppErr("User not found", 404));
    }

    let user = await GovtModel.findOne({ Email: Email });
    let token = GenerateToken(user._id);

    return res.status(200).json({
      status: "success",
      data: user,
      token: token,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//------------------Cretae SChlorship--------------------//

const CreateSchlorship = async (req, res, next) => {
  let user = await GovtModel.findById(req.user);
  if (!user) {
    return next(new AppErr("User Not found"));
  }

  //------------------Validation---------------------//
  let { SchlorshipName, State, Deadline, Description, Type } = req.body;
  if (!SchlorshipName) {
    return next(new AppErr("SchlorshipName is required", 404));
  } else if (!State) {
    return next(new AppErr("State is required", 404));
  } else if (!Deadline) {
    return next(new AppErr("Deadline is required", 404));
  } else if (!Description) {
    return next(new AppErr("Description is required", 404));
  } else if (!Type) {
    return next(new AppErr("Type is required", 404));
  }

  //--------------Create------------------------//
  req.body.governmentId = user._id;
  let newSchlorship = await SchlorshipModel.create(req.body);
  return res.status(200).json({
    status: "success",
    data: newSchlorship,
  });
};

//-----------------Get Own schlorsip-----------------//
const GetOwnSchlorship = async (req, res, next) => {
  try {
    let schlorship = await SchlorshipModel.find({ governmentId: req.user });
    return res.status(200).json({
      status: "success",
      data: schlorship,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//----------------Get Single Shlorship--------------//
const GetSingleSchlorship = async (req, res, next) => {
  try {
    let schlorship = await SchlorshipModel.findOne({ _id: req.params.id });
    return res.status(200).json({
      status: "success",
      data: schlorship,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//--------------------Get All Schlorship--------------------//
const GetAllSchlorship = async (req, res, next) => {
  try {
    let schlorship = await SchlorshipModel.find();
    return res.status(200).json({
      status: "success",
      data: schlorship,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//--------------------Get All colleges------------------//
const GetAllCollege = async (req, res, next) => {
  try {
    let college = await CollegeModel.find();
    return res.status(200).json({
      status: "success",
      data: college,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//------------------Get Single Schlorship by all-----------//
const GetSingleSchlorshipbyAll = async (req, res, next) => {
  try {
    let schlor = await SchlorshipModel.findOne({ _id: req.params.id });
    return res.status(200).json({
      status: "success",
      data: schlor,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//------------------Verfiy College-----------------------//
const VerifyCollege = async (req, res, next) => {
  try {
    let { CollegeId } = req.body;
    //-------------------Get College Id--------------------//
    let college = await CollegeModel.findById(CollegeId);
    let govt = await GovtModel.findById(req.user);
    if (!college) {
      return next(new AppErr("Couldn't find College", 404));
    }
    //------------------- push Govt id---------------------//
    college.VerfiedStateId.push(req.user);

    //--------------------push State name--------------------//
    college.VerfiedState.push(govt.State);

    await college.save();

    return res.status(200).json({
      status: "success",
      data: college,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-------------------Get All Own verified College------------------//
const GetAllownVerifiedcollege = async (req, res, next) => {
  try {
    let college = await CollegeModel.find({
      VerfiedStateId: req.user,
    });
    return res.status(200).json({
      status: "success",
      data: college,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//----------------Recommended---------------------------//
const GetRecommended = async (req, res, next) => {
  let user = await UserModel.findById(req.user);
  let schlor = await SchlorshipModel.find({
    State: user.State,
  });
  return res.status(200).json({
    status: "Success",
    data: schlor,
  });
};

module.exports = {
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
  GetRecommended,
};
