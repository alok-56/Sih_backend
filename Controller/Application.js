const AppErr = require("../Global/Error");
const SendNotification = require("../Global/NotifyingCollege");
const SendEmailUpdate = require("../Global/SendUpdateEmail");
const ApplicationModel = require("../Model/Application");
const CollegeModel = require("../Model/College");
const GovtModel = require("../Model/Goverment");
const SchlorshipModel = require("../Model/Schlorship");
const UserModel = require("../Model/User");

//--------------Create application----------------//
const CreateApplication = async (req, res, next) => {
  try {
    let {
      GovtId,
      CollegeId,
      SchlorshipId,
      StudentName,
      Email,
      Phonenumber,
      State,
      District,
      Address,
      CollegeName,
      Year,
      CollegeEmail,
      CollegenNumber,
      AdharCard,
      IncomeCertificate,
      RecidentCertificate,
      CasteCertificate,
      Bonafite,
      Marksheet,
    } = req.body;

    //--------------finding users----------------//
    let users = await UserModel.findById(req.user);
    if (!users) {
      return next(new AppErr("User not found", 404));
    }

    //--------------Checking users in application--------------//
    let userFound = await ApplicationModel.findOne({ StudentId: req.user });
    if (userFound) {
      return next(new AppErr("User Already Resisted", 404));
    }
    req.body.StudentId = req.user;
    if (users.LoginType === "Adharcard") {
      req.body.collegeVerified = "Pending";
      req.body.Stage1 = "Pending";
      req.body.Stage2 = "Pending";
      req.body.Stage3 = "Pending";
    } else {
      req.body.collegeVerified = "Pending";
      req.body.Stage1 = "Verified";
      req.body.Stage2 = "Verified";
      req.body.Stage3 = "Pending";
      req.body.AdharCard = users.AdharCard;
      req.body.CasteCertificate = users.CasteCertificate;
      req.body.RecidentCertificate = users.RecidentCertificate;
      req.body.IncomeCertificate = users.IncomeCertificate;
      req.body.Marksheet = users.Marksheet;
    }
    let schlorship = await SchlorshipModel.findById(SchlorshipId);
    let application = await ApplicationModel.create(req.body);

    users.Application.push(application._id);
    await users.save();
    schlorship.Application.push(application._id);
    await schlorship.save();
    let college = await CollegeModel.findById(CollegeId);
    if (!college) {
      return next(new App());
    }
    //-------------If not verified generaate tickets---------//
    if (!college.VerfiedState.includes(GovtId)) {
      SendNotification(college.Email)
        .catch((err) => {
          return next(new AppErr(err, 500));
        });
    }

    return res.status(200).json({
      status: "success",
      data: application,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//--------------Update Application--------------//

const UpdateApplication = async (req, res, next) => {
  try {
    let {
      applicationid,
      Status,
      collegeVerified,
      Stage1,
      Stage2,
      Stage3,
      Email,
    } = req.body;

    let application = await ApplicationModel.findById(applicationid);
    if (!application) {
      return next(new AppErr("application not found", 500));
    }
    let updateApplication = await ApplicationModel.findByIdAndUpdate(
      applicationid,
      {
        Status: Status,
        collegeVerified: collegeVerified,
        Stage1: Stage1,
        Stage2: Stage2,
        Stage3: Stage3,
      },
      { mew: true }
    );
    console.log(application.Email);
    SendEmailUpdate(application.Email, application.StudentName, Status).catch(
      (err) => {
        return next(new AppErr(err, 500));
      }
    );

    return res.status(200).json({
      status: "success",
      data: updateApplication,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//----------Get All Application by state if college verfified -------//
const GetallApplicationCollege_verified = async () => {
  try {
    let college = await CollegeModel.findById(req.user);
    if (!college) {
      return next(new AppErr("College not found", 404));
    }

    let application = await ApplicationModel.find({
      CollegeId: college._id,
      collegeVerified: "Pending",
    });

    return res.status(200).json({
      status: "success",
      data: application,
    });
  } catch (error) {}
};

//----------Get All Application by state if college not verfified --------//
const GetallapplicationCollge = async (req, res, next) => {
  try {
    let college = await CollegeModel.findById(req.user);
    if (!college) {
      return next(new AppErr("College not found", 404));
    }

    let application = await ApplicationModel.find({
      CollegeId: college._id,
      collegeVerified: "Pending",
    });

    return res.status(200).json({
      status: "success",
      data: application,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-------------Get All Application by state if College Verified application for stage 1-------//
const GetallapplicationStage1 = async (req, res, next) => {
  try {
    let govt = await GovtModel.findById(req.user);
    if (!govt) {
      return next(new AppErr("College not found", 404));
    }

    let application = await ApplicationModel.find({
      GovtId: govt._id,
      collegeVerified: "Verified",
      Stage1: "Pending",
      Stage2: "Pending",
      Stage3: "Pending",
    });

    return res.status(200).json({
      status: "success",
      data: application,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-------------Get All Application by state if colege verified application and stage1 verified  for stage 2-----//
const GetallapplicationStage2 = async (req, res, next) => {
  try {
    let govt = await GovtModel.findById(req.user);
    if (!govt) {
      return next(new AppErr("College not found", 404));
    }

    let application = await ApplicationModel.find({
      GovtId: govt._id,
      collegeVerified: "Verified",
      Stage1: "Verified",
      Stage2: "Pending",
      Stage3: "Pending",
    });

    return res.status(200).json({
      status: "success",
      data: application,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-------------Get All Application by state if colege verified application and stage1 and statge2 verified  for stage 3-----//
const GetallapplicationStage3 = async (req, res, next) => {
  try {
    let govt = await GovtModel.findById(req.user);
    if (!govt) {
      return next(new AppErr("College not found", 404));
    }

    let application = await ApplicationModel.find({
      GovtId: govt._id,
      collegeVerified: "Verified",
      Stage1: "Verified",
      Stage2: "Verified",
      Stage3: "Pending",
    });

    return res.status(200).json({
      status: "success",
      data: application,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-------------Get All Application by state if colege verified application and all stage-----//
const GetallVerfied = async (req, res, next) => {
  try {
    let govt = await GovtModel.findById(req.user);
    if (!govt) {
      return next(new AppErr("College not found", 404));
    }

    let application = await ApplicationModel.find({
      GovtId: govt._id,
      collegeVerified: "Verified",
      Stage1: "Verified",
      Stage2: "Verified",
      Stage3: "Verified",
    });

    return res.status(200).json({
      status: "success",
      data: application,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};
module.exports = {
  CreateApplication,
  UpdateApplication,
  GetallapplicationCollge,
  GetallapplicationStage1,
  GetallapplicationStage2,
  GetallapplicationStage3,
  GetallVerfied,
};
