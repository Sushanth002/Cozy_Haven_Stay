const db = require("../../config/dbconfig");
const models = require("../../models/index");


// create review with booking id
// user dashboard ->bookings  ->creates review for any booking
module.exports.addNewReview = async (data) => {
  try {
    // Create a new review record
    const result = await models.reviewDetailModel.create({
      booking_id: data.booking_id,
      review: data.review,
      rating: data.rating,
    });
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

//Get reviews by hotel Id

module.exports.getAllReviewByHotelId = async (hotelId) => {
  try {
    // Query the database to retrieve reviews associated with the provided hotel ID
    const result = await models.reviewDetailModel.findAll({
      attributes: ['review_id', 'review', 'rating', 'time_stamp'], // Specify the attributes you want to retrieve
      include: [
        {
          model: models.bookingDetailModel,
          where: { hotel_id: hotelId },
          attributes: [] // Exclude all attributes from the booking table
        },
      ],
    });

    // Extract the data values from the query result
    const dataValuesArray = result.map((instance) => instance.dataValues);
    return dataValuesArray;
  } catch (error) {
    console.error("Error fetching reviews by hotel ID:", error);
    return "FAILURE";
  }
};

// list all reviews of user

module.exports.getAllReviewByUserId = async (userId) => {
  try {
    // Query the database to retrieve reviews associated with the provided hotel ID
    const result = await models.reviewDetailModel.findAll({
      attributes: ['review_id', 'review', 'rating', 'time_stamp'], // Specify the attributes you want to retrieve
      include: [
        {
          model: models.bookingDetailModel,
          where: { user_id: userId },
          attributes: [] // Exclude all attributes from the booking table
        },
      ],
    });

    // Extract the data values from the query result
    const dataValuesArray = result.map((instance) => instance.dataValues);
    return dataValuesArray;
  } catch (error) {
    console.error("Error fetching reviews by user ID:", error);
    return "FAILURE";
  }
};

//reviews by booking id

module.exports.getAllReviewByBookingId = async (bookingId) => {
    try {
      const reviews = await models.reviewDetailModel.findAll({
        where: {
          booking_id: bookingId,
        },
      });
      return reviews;
    } catch (error) {
      console.error("Error fetching reviews by booking ID:", error);
      return "FAILURE";
    }
};
