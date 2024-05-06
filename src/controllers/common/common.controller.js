const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const { Op } = require("sequelize");

const hotelService = require("../../services/hotel/hotel.service");
const roomService = require("../../services/hotel/room.service");
const reviewService = require("../../services/hotel/review.service");

// get all hotels by checkindate, checkoutdate, noof rooms
module.exports.searchHotel = AsyncHandler(async (req, res) => {
  try {
    let data = req.body;
    // data={inputCheckinDate,inputCheckoutDate, inputLocation,inputNoOfRooms }
    let outputHotels = await hotelService.getHotelByInput(data);
    if (outputHotels === "FAILURE") {
      throw new ApiError(500, "could not fetch hotels by userinput");
    }
    if (!outputHotels) {
      return res.status(200).json(200, [], "No hotels to show ");
    }

    return res
      .status(200)
      .json(
        200,
        [outputHotels, inputCheckoutDate, inputCheckoutDate],
        "hotels Fetched "
      );
  } catch (error) {
    throw error;
  }
});
// get all rooms by hotelid+checkindate and checkoutdate
module.exports.getRoomByInput = AsyncHandler(async (req, res) => {
  try {
    let data = req.body;
    // data = {hotel_id,inputCheckoutDate,inputCheckoutDate}
    let outputRoomsAvailable = await roomService.getRoomByInput(data);
    if (outputRoomsAvailable.length == 0) {
      return res.status(200).json(200, [], "No rooms found");
    }
    if (outputRoomsAvailable === "FAILURE") {
      throw new ApiError(500, "couldnot fetch rooms by user input");
    }
    return res.status(200).json(200, outputRoomsAvailable, "Fetched rooms");
  } catch (error) {
    throw error;
  }
});
// get all review by hotelid
module.exports.getReviewByHotelID = AsyncHandler(async (req, res) => {
  try {
    let { hotelid } = req.params;

    let allReviews = await reviewService.getAllReviewByHotelId(hotelid);
    if (allReviews === "FAILURE") {
      throw new ApiError(500, "COuldnot fetch review by hotelid");
    }

    return res.status(200).json(200, allReviews, "fetch reviews");
  } catch (error) {
    throw error;
  }
});
