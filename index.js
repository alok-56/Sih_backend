const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const DbConnect = require("./Config/Db");
const DummyRouter = require("./Routes/DummyData");
const globalErrHandler = require("./Middleware/GlobalError");
const UserRouter = require("./Routes/Users");
const CollegeRouter = require("./Routes/College");
const bodyParser = require("body-parser");
const GovermentRouter = require("./Routes/Government");
const ApplicationRouter = require("./Routes/Application");
DbConnect();

//------------------Middleware-------------------//

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//------------------Roues Middleware----------------//
app.use("/api/v1/DummyData", DummyRouter);
app.use("/api/v1/Users", UserRouter);
app.use("/api/v1/College", CollegeRouter);
app.use("/api/v1/Government", GovermentRouter);
app.use("/api/v1/Application", ApplicationRouter);

app.use(globalErrHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
