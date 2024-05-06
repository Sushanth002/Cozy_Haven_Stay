const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
require("dotenv").config();
const adminService = require("../services/admin/admin_detail.service");
const hotelOwnerService = require("../services/hotel/hotel_owner_detail.service");
const userService = require("../services/user/user_detail.service");

module.exports.verifyJWT = async (req, res, next) => {
  try {
    console.log("###########verifyJWTSTART#################");
    const token = req.cookies?.accessToken;
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    let decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userRole = req.cookies?.userRole;
    let result;
    if (userRole === "admin") {
      result = await adminService.getAdminById(decodedToken.id);
    } else if (userRole === "owner") {
      result = await hotelOwnerService.getHotelOwnerById(decodedToken.id);
    } else if (userRole === "user") {
      result = await userService.getUserById(decodedToken.id);
    }
    if (!result) {
      throw new ApiError(401, "Invalid Access Token");
    }

    if (userRole === "admin") {
      delete result.admin_password;
    } else {
      delete result.password;
    }
    delete result.refresh_token;

    req.auth = { ...result, role: userRole, access_token: token };
    console.log("###########verifyJWTEND#################");
    next();
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
};
