const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require("dotenv").config();

const userService = require("../../services/user/user_detail.service");
const hotelService = require("../../services/hotel/hotel.service");
const bookingService= require("../../services/booking/booking.service");
const reviewService= require("../../services/hotel/review.service");
const roomService = require("../../models/index");
const models = require("../../models/index");

const logger = require('../../utils/loggers');


// register new user
module.exports.userRegister = AsyncHandler(async (req, res) => {
  try {
    let data=req.body;

    const hashedPassword = await bcrypt.hash(data.password, 10);

    data.password = hashedPassword;

    let result=await userService.addNewUser(data);

    if (result == "FAILURE"){
      throw new ApiError(500,"Couldnot add new user to database please change Email or Contact Number");
    }

    console.log("result:",result);
    logger.info("New User Registered Successfully User Details : " , result);
    return res
    .status(200)
    .json(new ApiResponse(200, result, "New User Registered"));
  } catch (error) {
    throw error;
  }
});

//user Login

module.exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await models.userDetailModel.findOne({where: { email: email }});

    if (!user) {
      console.log("User not found");
      logger.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      logger.error("User try to login with invalid Password");
      return res.status(401).json({ message: "Incorrect password" });
    }

    const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // Generate token with 1 hour expiration

    console.log("Login successful. Access token:", accessToken);
    logger.info("Login successfully. User Name : " + user.user_name);
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error in user login:", error);
    next(error);
  }
};

//logout

module.exports.userLogout = async (req, res, next) => {
  try {
    // Clear the token
    res.clearCookie('accessToken');

    // Send a response indicating successful logout
    logger.info("Logout successfull.");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in user logout:", error);
    next(error);
  }
};


//search hotels by location,checkInDate and checkOutDate

// module.exports.searchHotelsByLocation = AsyncHandler(async (req, res) => {
//   try {
//     const { location, checkinDate, checkoutDate } = req.params;

    
//     const hotels = await hotelService.searchHotels(location, checkinDate, checkoutDate);

//     if (!hotels || hotels.length === 0) {
//       throw new ApiError(404, "No hotels found based on the search criteria");
//     }

//     // Send the response with the list of hotels
//     return res.status(200).json(new ApiResponse(200, hotels, 'Hotels found based on the search criteria'));
//   } catch (error) {
//     console.error('Error searching hotels:', error);
//     throw error; 
//   }
// });

module.exports.searchHotelsByLocation = AsyncHandler(async (req, res) => {
  try {
    const { location, checkinDate, checkoutDate, numberOfRooms } = req.params;

    // Search for hotels based on the provided location, check-in date, checkout date, and number of rooms
    const hotels = await hotelService.searchHotels(location, checkinDate, checkoutDate, numberOfRooms);

    if (!hotels || hotels.length === 0) {
      // If no hotels found, send a 404 response
      throw new ApiError(404, "No hotels found based on the search criteria");
    }

    // Send the response with the list of hotels
    return res.status(200).json(new ApiResponse(200, hotels, 'Hotels found based on the search criteria'));
  } catch (error) {
    console.error('Error searching hotels:', error);
    // Forward the error to the error handler middleware
    throw error;
  }
});




//Select hotel and make room reservation.

//cancelling Registration

module.exports.cancelRegistration = AsyncHandler(async (req, res) => {
  try {
    const { booking_id } = req.params; // Access booking_id from req.params

    const bookings = await bookingService.cancelReservation(booking_id);

    if (bookings === "FAILURE") {
      throw new ApiError(400, "No bookings on this id");
    }
    logger.info("Booking Id : "+booking_id+" cancelled",bookings);
    return res
      .status(200)
      .json(new ApiResponse(200, bookings, "Booking cancelled"));
  } catch (error) {
    logger.error(`Error cancelling booking for booking ID: ${req.params.booking_id}`, error);
    throw error;
  }
});

//Booking History

module.exports.bookingHistory = AsyncHandler(async (req, res) => {
  let user_id;
  try {
    user_id = req.params.user_id; // Access booking_id from req.params

    const bookings = await bookingService.viewReservationHistory(user_id);

    if (bookings === "FAILURE") {
      throw new ApiError(400, "No bookings on this id");
    }
    logger.info("User Id : "+user_id+" Viewed the booking history",bookings);
    return res
      .status(200)
      .json(new ApiResponse(200, bookings, "Previous Bookings"));
  } catch (error) {
    logger.error(`Error occurred while getting booking history for user Id : ${user_id}, `, error);
    throw error;
  }
});


//Adding Reviews

module.exports.addReview = AsyncHandler(async (req, res) => {
  const { bookingId, reviewMessage, rating } = req.body;

  try {
    
    if (!bookingId || !reviewMessage || !rating) {
      throw new ApiError(400, "Please provide booking ID, review message, and rating");
    }

    const newReview = await userService.addReview(bookingId, reviewMessage, rating);

    logger.info("User Successfully added review for Booking Id :"+bookingId,newReview);
    return res.status(201).json(new ApiResponse(201, newReview, "Review added successfully"));
  } catch (error) {
    logger.error("Error occurred while adding review ", error);
    return res.status(500).json(new ApiResponse(500, null, "Failed to add review. Please check booking Id"));
  }
});


//Reviews by hotelId

module.exports.getAllReviewByHotelId = AsyncHandler(async (req, res) => {
  let hotel_id;
  try {
    console.log('Request params:', req.params.hotel_id); // Log request parameters
    hotel_id  = req.params.hotel_id; // Ensure correct parameter name

    // Parse hotel ID to an integer
    const parsedHotelId = parseInt(hotel_id);

    // Call the service function to get reviews by hotel ID
    const reviews = await reviewService.getAllReviewByHotelId(parsedHotelId);

    if (reviews === "FAILURE") {
      throw new ApiError(404, "No reviews found for this hotel ID");
    }
    // Send the response with the list of reviews
    logger.info("User tried to view the reviews by hotl id : "+hotel_id,reviews);
    return res.status(200).json(new ApiResponse(200, reviews, "Reviews found for the hotel ID"));
  } catch (error) {
    console.error('Error fetching reviews by hotel ID:', error);
    logger.error(`Error occurred while getting review for Hotel Id: ${hotel_id},`, error);
    throw error;
  }
});

// getting revierws by user id

module.exports.getAllReviewByUserId = AsyncHandler(async (req, res) => {
  let user_id;
  try {
    console.log('Request params:', req.params); // Log request parameters
     user_id  = req.params.user_id; // Ensure correct parameter name

    // Parse hotel ID to an integer
    const parsedUserId = parseInt(user_id);

    // Call the service function to get reviews by hotel ID
    const reviews = await reviewService.getAllReviewByUserId(parsedUserId);

    if (reviews === "FAILURE") {
      throw new ApiError(404, "No reviews found for this hotel ID");
    }

    // Send the response with the list of reviews
    logger.info(`Reviews retrieved successfully for user ID: ${user_id}`, reviews);
    return res.status(200).json(new ApiResponse(200, reviews, "Reviews found for the hotel ID"));
  } catch (error) {
    console.error('Error fetching reviews by User ID:', error);
    logger.error(`Error fetching reviews for user ID: ${user_id},`, error);
    throw error;
  }
});


//get reviews by booking id

module.exports.getAllReviewByBookingId = AsyncHandler(async (req, res) => {
  let booking_id;
  try {
    console.log('Request params:', req.params); 
     booking_id = req.params.booking_id; 
   
    const parsedBookingId = parseInt(booking_id);

    const reviews = await reviewService.getAllReviewByBookingId(parsedBookingId);

    if (reviews === "FAILURE") {
      throw new ApiError(404, "No reviews found for this booking ID");
    }
    
    logger.info(`Reviews retrieved successfully for booking ID: ${booking_id}`, reviews);
    return res.status(200).json(new ApiResponse(200, reviews, "Reviews found for the booking ID"));
  } catch (error) {
    console.error('Error fetching reviews by Booking ID:', error);
    logger.error(`Error fetching reviews for booking ID: ${booking_id},`, error);
    throw error;
  }
});