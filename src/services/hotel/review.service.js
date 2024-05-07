const { Sequelize } = require("sequelize");
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

//list all review based on hotel
// home -> individual hotel page
module.exports.getAllReviewByHotelId = async (hotelId) => {
  try {
    let bookingResult = await models.bookingDetailModel.findAll({
      where: { hotel_id: hotelId },
      attributes: ["booking_id"], // Select only the booking IDs
    });
    const bookingIds = bookingResult.map((booking) => booking.booking_id);

    let reviewResult = await models.reviewDetailModel.findAll({
      where: { booking_id: bookingIds },
    });

    console.log(reviewResult);
    const dataValuesArray = reviewResult.map((instance) => instance.dataValues);
    return dataValuesArray;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// list all reviews of user
// user dashboard -> reviews for all hotel
module.exports.getAllReviewByUserId = async () => {
  try {
    const [result] = await models.reviewDetailModel.findAll({
      include: [
        {
          model: models.bookingDetailModel,
          where: { user_id: userId },
        },
      ],
    });
    const dataValuesArray = result.map((instance) => instance.dataValues);
    return dataValuesArray;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
