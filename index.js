const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// ************************************************************
const bcrypt = require("bcrypt");

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));

// *************************************************************

//Api Routes
// admin router
const adminRouter = require("./src/routes/admin.routes");
app.use("/api/admin/", adminRouter);
// hotelowner router
const ownerRouter = require("./src/routes/owner.routes");
app.use("/api/owner/", ownerRouter);
// user router
const userRouter = require("./src/routes/user.routes");
app.use("/api/user/", userRouter);
// common router
const commonRouter = require("./src/routes/common.routes");
app.use("/api/", commonRouter);

// error middleware
const errorHandler = require("./src/middlewares/error.middleware");
app.use(errorHandler);

// **************************************************************

// post running at 3000
const backendPort = process.env.PORT || 3000;
app.listen(backendPort, () => {
  console.log(`Server is running at http://localhost:${backendPort}`);
});

module.exports = app; //for testing

// ***********************************
