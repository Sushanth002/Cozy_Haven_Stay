// const jwt = require("jsonwebtoken");
// const hotelOwnerService = require("../services/hotel/hotel_owner_detail.service");
// const userService = require("../services/user/user_detail.service");
// const adminService = require("../services/admin/admin_detail.service");
// require("dotenv").config();

// const generateAccessToken = async (data) => {
//   if (!data || !data.id || !data.email || !data.name) {
//     throw new Error("Invalid data object for generating access token");
//   }
//   return jwt.sign(
//     {
//       id: data.id,
//       email: data.email,
//       name: data.name,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d",
//     }
//   );
// };

// const generateRefreshToken = async (data) => {
//   if (!data || !data.id) {
//     throw new Error("Invalid data object for generating refresh token");
//   }

//   return jwt.sign(
//     {
//       id: data.id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "30d",
//     }
//   );
// };

// module.exports.generateAccessAndRefreshTokens = async (userRole, id) => {
//   try {
//     let result;
//     let dataForToken;
//     if (userRole === "admin") {
//       result = await adminService.getAdminById(id);
//       console.log(result);
//       dataForToken = {
//         id: result.admin_id,
//         email: result.admin_email,
//         name: result.admin_name,
//       };
//     } else if (userRole === "owner") {
//       result = await hotelOwnerService.getHotelOwnerById(id);
//       dataForToken = {
//         id: result.owner_id,
//         email: result.email,
//         name: result.owner_name,
//       };
//     } else if (userRole === "user") {
//       result = await userService.getUserById(id);
//       dataForToken = {
//         id: result.user_id,
//         email: result.email,
//         name: result.user_name,
//       };
//     }

//     if (result === "FAILURE") {
//       throw new Error(500, `INTERNAL DATABASE ERROR WHILE GETTING ${userRole}`);
//     }
//     console.log(dataForToken);
//     const accessToken = generateAccessToken(dataForToken);
//     const refreshToken = generateRefreshToken(dataForToken);

//     result.refreshToken = refreshToken;
//     let updatedResult;
//     if (userRole === "admin") {
//       updatedResult = await adminService.updateAdminDetailRefreshToken(result);
//     } else if (userRole === "owner") {
//       updatedResult = await hotelOwnerService.updateHotelOwnerRefreshToken(
//         result
//       );
//     } else if (userRole === "user") {
//       updatedResult = await userService.updateUserRefreshToken(result);
//     }

//     return { accessToken, refreshToken };
//   } catch (error) {
//     console.log(error);
//     return "FAILURE";
//   }
// };

const jwt = require("jsonwebtoken");
const hotelOwnerService = require("../services/hotel/hotel_owner_detail.service");
const userService = require("../services/user/user_detail.service");
const adminService = require("../services/admin/admin_detail.service");
require("dotenv").config();

const generateAccessToken = async (data) => {
  if (!data || !data.id || !data.email || !data.name) {
    throw new Error("Invalid data object for generating access token");
  }
  return jwt.sign(
    {
      id: data.id,
      email: data.email,
      name: data.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d",
    }
  );
};

const generateRefreshToken = async (data) => {
  if (!data || !data.id) {
    throw new Error("Invalid data object for generating refresh token");
  }

  return jwt.sign(
    {
      id: data.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "30d",
    }
  );
};

module.exports.generateAccessAndRefreshTokens = async (userRole, id) => {
  try {
    let result;
    let dataForToken;
    if (userRole === "admin") {
      result = await adminService.getAdminById(id);
      console.log(result);
      dataForToken = {
        id: result.admin_id,
        email: result.admin_email,
        name: result.admin_name,
      };
    } else if (userRole === "owner") {
      result = await hotelOwnerService.getHotelOwnerById(id);
      dataForToken = {
        id: result.owner_id,
        email: result.email,
        name: result.owner_name,
      };
    } else if (userRole === "user") {
      result = await userService.getUserById(id);
      dataForToken = {
        id: result.user_id,
        email: result.email,
        name: result.user_name,
      };
    }

    if (result === "FAILURE") {
      throw new Error(500, `INTERNAL DATABASE ERROR WHILE GETTING ${userRole}`);
    }
    console.log(dataForToken);
    const accessToken = generateAccessToken(dataForToken);
    const refreshToken = generateRefreshToken(dataForToken);

    result.refreshToken = refreshToken;
    let updatedResult;
    if (userRole === "admin") {
      updatedResult = await adminService.updateAdminDetailRefreshToken(result);
    } else if (userRole === "owner") {
      updatedResult = await hotelOwnerService.updateHotelOwnerRefreshToken(
        result
      );
    } else if (userRole === "user") {
      updatedResult = await userService.updateUserRefreshToken(result);
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};