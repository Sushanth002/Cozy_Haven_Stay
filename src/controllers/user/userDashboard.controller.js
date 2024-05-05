const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");


const userService = require("../../services/user/user_detail.service");
const bookingService = require("../../services/booking/booking.service");

const logger = require('../../utils/loggers');

// Update user details
module.exports.updateUserDetail = AsyncHandler(async (req, res) => {
  try {
    // Extract data from request body
    const { user_id } = req.params;
    const { user_name, gender, contact_no, address } = req.body;

    // Construct data object to pass to updateUser function
    const userData = {
      user_id,
      user_name,
      gender,
      contact_no,
      address,
    };

    const result = await userService.updateUser(userData);

    // Check if update was successful
    if (result === 1) {
      logger.info("User Details Updated: " , userData);
      return res.status(200).json(new ApiResponse(200,result,"User Details updated successfully"));
    } else {
      logger.error("User try to update details but failed");
      throw new ApiError(500, "Failed to update user details");
    }
  } catch (error) {
    throw error;
  }
});

//Future Bookings

// module.exports.getFutureBookings = async (req, res) => {
//   try {
//     const futureBookings = await bookingService.getFutureBookings();

//     if (futureBookings === "FAILURE") {
//       throw new ApiError(404, "No future bookings found");
//     }

//     return res.status(200).json(new ApiResponse(200, futureBookings, "Future bookings found"));
//   } catch (error) {
//     throw error;
   
//   }
// };


module.exports.getFutureBookings = async (req, res) => {
  try {

    const{user_id} = req.params;
    
    const futureBookings = await bookingService.getFutureBookings(user_id);

    if (futureBookings === "FAILURE") {
      throw new ApiError(404, "No future bookings found");
    }
    logger.info("User Id : "+user_id+" tried to see future bookings",futureBookings);
    return res.status(200).json(new ApiResponse(200, futureBookings, "Future bookings found"));
  } catch (error) {
    logger.error(`Error getting future bookings for this User id : ${req.params.user_id}`, error);
    throw error;
   
  }
};


