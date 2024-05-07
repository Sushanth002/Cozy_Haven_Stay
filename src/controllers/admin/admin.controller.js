const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const adminLogger = require("../../../logger/adminLogger/index");

const { isPasswordCorrect } = require("../../utils/bcryptMethods");
const { generateAccessAndRefreshTokens } = require("../../utils/generateToken");
require("dotenv").config();

const adminService = require("../../services/admin/admin_detail.service");

const { validationResult } = require("express-validator");

// admin login
module.exports.adminLogin = AsyncHandler(async (req, res) => {
  try {
    // console.log("*******START********");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = [];
      errors
        .array()
        .map((err) => formattedErrors.push({ [err.path]: err.msg }));

      return res.status(422).json({
        success: false,
        errors: formattedErrors,
      });
    }
    let data = req.body;
    //find the user
    let admin = await adminService.getAdminByEmail(data.admin_email);
    if (admin === "FAILURE") {
      adminLogger.error(
        `adminLogin -> $ADMIN_EMAIL=[${data.admin_email}] : Invalid admin email`
      );
      throw new ApiError(401, "Invalid admin email");
    }
    //password check
    const isPasswordValid = await isPasswordCorrect(
      data.admin_password,
      admin.admin_password
    );
    if (!isPasswordValid) {
      adminLogger.error(
        `adminLogin -> $ADMIN_EMAIL=[${data.admin_email}] : Invalid admin credentials`
      );
      throw new ApiError(401, "Invalid admin credentials");
    }

    //set access and referesh token
    let tokens = await generateAccessAndRefreshTokens("admin", admin.admin_id);
    if (tokens === "FAILURE") {
      adminLogger.error(
        `adminLogin -> $ADMIN_EMAIL=[${data.admin_email}] : Token error`
      );
      throw new ApiError(500, "Token error");
    }
    let accessToken = await tokens.accessToken;
    let refreshToken = await tokens.refreshToken;

    // update access token in admin_detail
    admin.refresh_token = refreshToken;
    const updateAdminDetail = await adminService.updateAdminDetail(admin);
    if (updateAdminDetail === "FAILURE") {
      adminLogger.error(
        `adminLogin -> $ADMIN_EMAIL=[${data.admin_email}] : Couldnot update admin refreshtoken`
      );
      throw new ApiError(500, "Couldnot update admin refreshtoken ");
    }

    //send cookie
    const options = {
      httpOnly: true,
      secure: true,
    };
    delete admin.admin_password;
    delete admin.refresh_token;

    adminLogger.info(
      `adminLogin -> $ADMIN_EMAIL=[${data.admin_email}] : admin logged In Successfully`
    );
    // console.log("*******END********");
    return res
      .status(200)
      .cookie("userRole", "admin", options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, admin, "admin logged In Successfully"));
  } catch (error) {
    throw error;
  }
});
// admin logout
module.exports.adminLogout = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START#########");
    let { admin_id: admin_authid } = req.auth;
    let adminid = parseInt(req.params.adminid);

    let data = await adminService.getAdminById(admin_authid);
    if (data === "FAILURE") {
      adminLogger.error(
        `adminLogout -> $ADMIN_ID=[${admin_authid}] : admin_id invalid`
      );
      throw new ApiError(401, "admin_id invalid");
    }

    data.refresh_token = null;
    let updatedResult = await adminService.updateAdminDetail(data);
    if (updatedResult === "FAILURE") {
      adminLogger.error(
        `adminLogout -> $ADMIN_ID=[${admin_authid}] : cannot remove admin refreshtoken`
      );
      throw new ApiError(500, "cannot remove admin refreshtoken");
    }

    adminLogger.info(
      `adminLogout -> $ADMIN_ID=[${admin_authid}] : admin logged Out successfully`
    );
    // console.log("###########END#################");

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("userRole", options)
      .clearCookie("accessToken", options)
      .json(new ApiResponse(200, {}, "admin logged Out successfully"));
  } catch (error) {
    throw error;
  }
});
// {
// "admin_name":"testadmin1",
// "admin_password":"testadminpassword1",
// "admin_email":"testadminemail1",
// "gender":"MALE",
// "admin_phoneno":"testadminphoneno1",
// }
