const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const userLogger = require("../../../logger/userLogger/index");

const userService = require("../../services/user/user_detail.service");
const bookingService = require("../../services/booking/booking.service");
const reviewService = require("../../services/hotel/review.service");

// update user_detail
module.exports.updateUserDetail = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { user_id: user_authid } = req.auth;
    let data = req.body;

    if (user_authid !== data.user_id) {
      userLogger.error(
        ` updateUserDetail-> $USER_ID=[${user_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }

    let result = await userService.updateUserDetail(data);
    if (result == "FAILURE") {
      userLogger.error(
        `updateUserDetail -> $USER_ID=[${user_authid}] : Couldnot update user in database `
      );
      throw new ApiError(500, "Couldnot update user in database ");
    }

    userLogger.info(
      `updateUserDetail -> $USER_ID=[${user_authid}] : user updated`
    );
    // console.log("#########END############");
    return res.status(200).json(new ApiResponse(200, "", " user updated"));
  } catch (error) {
    throw error;
  }
});
// get all past booking
module.exports.getPastBooking = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let userid = parseInt(req.params.userid);
    let { user_id: user_authid } = req.auth;

    // if (user_authid !== userid) {
    //   userLogger.error(
    //     ` updateUserDetail-> $USER_ID=[${user_authid}] : unauthorized access`
    //   );
    //   throw new ApiError(401, "unauthorized access");
    // }

    let pastBookings = await bookingService.getPastBookingByUserID(userid);
    if (pastBookings === "FAILURE") {
      userLogger.error(
        `getPastBooking -> $USER_ID=[${user_authid}] : Couldnot fetch past bookings `
      );
      throw new ApiError(500, "Couldnot fetch past bookings");
    }

    userLogger.info(
      `getPastBooking -> $USER_ID=[${user_authid}] : fetched past booking successfully`
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(
        new ApiResponse(200, pastBookings, "fetched past booking successfully")
      );
  } catch (error) {
    throw error;
  }
});
// give review to hotel stayed in past
module.exports.addReviewToHotel = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { userid, booking_id, review, rating } = req.body;
    let { user_id: user_authid } = req.auth;

    if (user_authid !== userid) {
      userLogger.error(
        ` addReviewToHotel-> $USER_ID=[${user_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }

    let reviewData = { booking_id, review, rating };
    let reviewAdded = await reviewService.addNewReview(reviewData);
    if (reviewAdded === "FAILURE") {
      userLogger.error(
        ` addReviewToHotel-> $USER_ID=[${user_authid}] : Couldnot add review to database`
      );
      throw new ApiError(500, "Couldnot add review to database");
    }

    userLogger.info(
      `addReviewToHotel -> $USER_ID=[${user_authid}] : Added review to database`
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(new ApiResponse(200, "", "Added review to database"));
  } catch (error) {
    throw error;
  }
});
// get all current booking
module.exports.getCurrentBooking = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let userid = parseInt(req.params.userid);
    let { user_id: user_authid } = req.auth;

    // if (user_authid !== userid) {
    //   userLogger.error(
    //     ` updateUserDetail-> $USER_ID=[${user_authid}] : unauthorized access`
    //   );
    //   throw new ApiError(401, "unauthorized access");
    // }

    let currentBookings = await bookingService.getCurrentBookingByUserID(
      userid
    );
    if (currentBookings === "FAILURE") {
      userLogger.error(
        `getCurrentBooking -> $USER_ID=[${user_authid}] : Couldnot fetch current bookings `
      );
      throw new ApiError(500, "Couldnot fetch current bookings");
    }

    userLogger.info(
      `getCurrentBooking -> $USER_ID=[${user_authid}] : fetched current booking successfully`
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          currentBookings,
          "fetched current booking successfully"
        )
      );
  } catch (error) {
    throw error;
  }
});
// cancel booking by booking id
module.exports.cancelBookingByBookingID = AsyncHandler(async (req, res) => {
  try {
    let { user_id, booking_id } = req.body;
    let { user_id: user_authid } = req.auth;

    if (user_authid !== user_id) {
      userLogger.error(
        ` cancelBookingByBookingID-> $USER_ID=[${user_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }

    let data = { booking_id: booking_id, booking_status: "REFUND_PENDING" };
    let updateResult = await bookingService.updateBookingDetail(data);
    if (updateResult === "FAILURE") {
      userLogger.error(
        ` cancelBookingByBookingID-> $USER_ID=[${user_authid}] : couldnot update status of booking`
      );
      throw new ApiError(500, "couldnot update status of booking");
    }
    userLogger.info(
      `cancelBookingByBookingID -> $USER_ID=[${user_authid}] : updated booking status `
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(new ApiResponse(200, "", "updated booking status"));
  } catch (error) {
    throw error;
  }
});
