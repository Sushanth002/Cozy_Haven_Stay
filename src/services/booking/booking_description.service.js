// add new booking description for a room

const models = require("../../models");

// 1:user books new room
module.exports.addNewBookingDescription = async (data) => {
  try {
    let result = await models.bookingDescriptionModel.create(data);
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
// delete all booking description for a room
// 1:admin approved cancelation (by booking id)
module.exports.deleteAllBookingDescription = async (booking_id) => {
  try {
    let result = await models.bookingDescriptionModel.destroy({
      where: { booking_id: booking_id },
    });
    return result;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
