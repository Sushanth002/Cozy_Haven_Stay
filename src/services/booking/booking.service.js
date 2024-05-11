// add new booking

const models = require("../../models");
const { Op } = require("sequelize");

// 1-> user books single/multiple room -> new booking entry-> {add all booking description for all rooms [inside booking_description_detail]}
module.exports.addNewBookingDetail = async (data) => {
  try {
    let result = await models.bookingDetailModel.create(data);
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// cancel reservation
// hotel owner dashboard -> change booking status () by booking id
// 1-> booking status to REFUND_APPROVED -> {delete all rooms booked for that booking id [inside booking_description_service] }
// 2-> booking status to REFUND_CANCELED
module.exports.updateBookingDetail = async (data) => {
  try {
    console.log("******************");
    const [result] = await models.bookingDetailModel.update(
      {
        booking_status: data.booking_status,
      },
      { where: { booking_id: data.booking_id } }
    );
    return result;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

//past booking by userid
module.exports.getPastBookingByUserID = async (user_id) => {
  try {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const result = await models.bookingDetailModel.findAll({
      where: {
        user_id: user_id,
        checkout_date: {
          [Op.lt]: today,
        },
      },
    });

    let dataValuesArray = result.map((instance) => instance.dataValues);
    return dataValuesArray;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
//past booking by hotelid
module.exports.getPastBookingByHotelID = async (hotel_id) => {
  try {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const result = await models.bookingDetailModel.findAll({
      where: {
        hotel_id: hotel_id,
        checkout_date: {
          [Op.lt]: today,
        },
      },
    });
    console.log(result);
    let dataValuesArray = result.map((instance) => instance.dataValues);
    return dataValuesArray;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
//current booking by userid
module.exports.getCurrentBookingByUserID = async (user_id) => {
  try {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const result = await models.bookingDetailModel.findAll({
      where: {
        user_id: user_id,
        checkout_date: {
          [Op.gt]: today,
        },
      },
    });
    let dataValuesArray = result.map((instance) => instance.dataValues);
    return dataValuesArray;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
//current booking by hotelid
module.exports.getCurrentBookingByHotelID = async (hotel_id) => {
  try {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const result = await models.bookingDetailModel.findAll({
      where: {
        hotel_id: hotel_id,
        checkout_date: {
          [Op.gt]: today,
        },
      },
    });

    let dataValuesArray = result.map((instance) => instance.dataValues);
    return dataValuesArray;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

//update booing amount with additional charges

// module.exports.updateTotalBookingAmount = async(bookingId,totalBookingAmount)=>{

//   try{
//     const booking = await models.bookingDetailModel.findByPk(bookingId);
//     booking.total_booking_amount = totalBookingAmount;
//     return booking.total_booking_amount

//   }
//   catch (error) {
//     console.log(error);
//     return "FAILURE";
//   }

// }

module.exports.updateTotalBookingAmount = async (bookingId, totalBookingAmount) => {
  try {
    // Find the booking detail by ID
    const booking = await models.bookingDetailModel.findByPk(bookingId);
    if (!booking) {
      // If booking is not found, return false indicating failure
      return false;
    }

    // Update the total_booking_amount field
    booking.total_booking_amount = totalBookingAmount;

    // Save the changes to the database
    await booking.save();

    // Return true indicating success
    return true;
  } catch (error) {
    // If an error occurs, log the error and return false indicating failure
    console.error('Error updating total booking amount:', error);
    return false;
  }
};


//get bookings by bookingid

module.exports.getBookingDetailById = async (bookingId) => {
  try {
    // Find the booking detail by its ID
    const bookingDetail = await models.bookingDetailModel.findByPk(bookingId);
    return bookingDetail;
  } catch (error) {
    // Handle errors
    console.error(error);
    throw new Error("Failed to retrieve booking detail");
  }
};