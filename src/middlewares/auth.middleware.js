// const ApiError = require("../utils/ApiError");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const models = require("../models/index"); 

// module.exports.verifyJWT = async (req, _, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       throw new ApiError(401, "Unauthorized request");
//     }
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const user = await models.userDetailModel.findById(decodedToken?._id).select(
//       "-password -refreshToken"
//     );
//     if (!user) {
//       throw new ApiError(401, "Invalid Access Token");
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid access token");
//   }
// };


// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// module.exports.verifyJWT = async (req, _, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       throw new ApiError(401, "Unauthorized request");
//     }
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = decodedToken; // Populate req.user with decoded token
//     next();
//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid access token");
//   }
// };

const jwt = require("jsonwebtoken");
require("dotenv").config();


// module.exports.verifyJWT = async (req, _, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       throw new Error("Unauthorized request");
//     }
//     console.log("Token:", token); // Log the token to see if it's being extracted correctly
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log("Decoded token:", decodedToken); // Log the decoded token to see its contents
    
//     // Assuming user ID is stored in the token payload
//     const user = await models.userDetailModel.findByPk(decodedToken?.user_id);
//     console.log("User:", user); // Log the user object to see if it's being retrieved correctly

//     if (!user) {
//       throw new Error("Invalid Access Token");
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error);
//     return next(error); // Pass the error to the error handling middleware
//   }
// };

module.exports.verifyJWT = async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Unauthorized request");
    }
    console.log("Token:", token); // Log the token to see if it's being extracted correctly
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Token verified successfully");
    next();
  } catch (error) {
    console.error(error);
    return next(new Error("Invalid access token")); // Pass the error to the error handling middleware
  }
};