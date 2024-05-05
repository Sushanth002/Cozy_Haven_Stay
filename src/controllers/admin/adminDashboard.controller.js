const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");

// get all user data
module.exports.getAllUser = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new ApiError();
  }
});

// delete user data by id
module.exports.deleteUserById = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new ApiError();
  }
});

// *************************************************************
// get all hotelowner + hotel data
module.exports.getAllOwner = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new ApiError();
  }
});

// delete owner data by id
module.exports.deleteOwnerById = AsyncHandler(async (req, res) => {
  try {
    let { ownerid } = req.params;
  } catch (error) {
    throw new ApiError();
  }
});
