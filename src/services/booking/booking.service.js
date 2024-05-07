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
