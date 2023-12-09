const express = require("express");
const app = express();
// const cors = require("cors");
// const morgan = require("morgan");
const DbConnect = require("./Config/Db");
DbConnect();
// const DummyRouter = require("./Routes/DummyData");
// const globalErrHandler = require("./Middleware/GlobalError");
// const UserRouter = require("./Routes/Users");
// const CollegeRouter = require("./Routes/College");
// const UserModel = require("./Model/User");

// //------------------Middleware-------------------//

// app.use(express.json());
// app.use(cors());
// app.use(morgan("dev"));

// //------------------Roues Middleware----------------//
// app.use("/api/v1/DummyData", DummyRouter);
// app.use("/api/v1/Users", UserRouter);
// app.use("/api/v1/College", CollegeRouter);

// app.get("/", async (req, res) => {
//   let user = await UserModel.find();
//   res.status(200).json({
//     data: user,
//   });
// });

// app.use(globalErrHandler);

const port =process.env.PORT || 8080 
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
