const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const addNewHotelOwnerService = require("../../services/hotel/hotel_owner_detail.service");
// register new hotel owner
module.exports.ownerRegister = AsyncHandler(async (req, res) => {
  try {
    let data = req.body;

    let result = await addNewHotelOwnerService.addNewHotelOwner(data);

    if (result == "FAILURE") {
      throw new ApiError(500, "Couldnot add new hotelowner to database ");
    }

    console.log("result:", result);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "new hotelowner registered"));
  } catch (error) {
    throw error;
  }
});

//  logout existing hotelowner
module.exports.ownerLogin = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new ApiError();
  }
});

// login existing hotelowner
module.exports.ownerLogout = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new ApiError();
  }
});

// {
// "owner_name":"testowner1",
// "password":"testpassword1",
// "email":"testemail1",
// "gender":"MALE",
// "contact_no":"testcontactno1",
// "address":"testaddress1"
// }
