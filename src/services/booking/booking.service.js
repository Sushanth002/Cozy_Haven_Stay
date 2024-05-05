// add new booking
const { Op } = require("sequelize");
const models = require("../../models");

// 1-> user books single/multiple room -> new booking entry-> {add all booking description for all rooms [inside booking_description_detail]}
module.exports.addNewBookingDetail = async (data) => {
  try {
    let result = await models.bookingDetailModel.create(data);
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "Failure";
  }
};

// cancel reservation

module.exports.cancelReservation = async (booking_id) => {
  try {
    // Find the booking to cancel
    let booking = await models.bookingDetailModel.findByPk(booking_id);

    if (!booking) {
      throw new Error("Booking not found for this booking Id"); // Throw an error if booking is not found
    }

    // Update the booking status to 'REFUND_PENDING'
    await booking.update({
      booking_status: 'REFUND_PENDING'
    });

    return booking.dataValues;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the controller
  }
};

//Booking History

module.exports.viewReservationHistory = async (userId) => {
  try {
    // Find all bookings made by the user
    const bookings = await models.bookingDetailModel.findAll({
      where: {
        user_id: userId
      }
    });

    return bookings;
  } catch (error) {
    console.log(error);
    return "Failure";
  }
};

//Future Bookings

// module.exports.getFutureBookings = async () => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

//     const futureBookings = await models.bookingDetailModel.findAll({
//       where: {
//         checkout_date: {
//           [Op.gt]: today, // Find bookings where checkout_date is greater than today
//         },
//       },
//     });

//     return futureBookings;
//   } catch (error) {
//     console.log(error);
//     return "Failure";
//   }
// };

module.exports.getFutureBookings = async (user_id) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    const futureBookings = await models.bookingDetailModel.findAll({
      where: {
        user_id: user_id, // Filter by user_id
        checkout_date: {
          [Op.gt]: today, // Find bookings where checkout_date is greater than today
        },
      },
    });

    return futureBookings;
  } catch (error) {
    console.log(error);
    return "Failure";
  }
};






// hotel owner dashboard -> change booking status () by booking id
// 1-> booking status to REFUND_APPROVED -> {delete all rooms booked for that booking id [inside booking_description_service] }
// 2-> booking status to REFUND_CANCELED
module.exports.updateBookingDetail = async (data) => {
  try {
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
