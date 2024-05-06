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

//list all review based on hotel
// home -> individual hotel page
module.exports.getAllReviewByHotelId = async (hotelId) => {
  try {
    const result = await models.reviewDetailModel.findAll({
      include: [
        {
          model: models.bookingDetailModel,
          where: { hotel_id: hotelId },
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
