const db = require("../../config/dbconfig");
const models = require("../../models/index");
const { Op } = require("sequelize");

// get room by room id
module.exports.getRoomById = async (roomId) => {
  try {
    const result = await models.roomDetailModel.findByPk(roomId);
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
// get all room by hotel id
module.exports.getAllRoomsByHotelId = async (hotelId) => {
  try {
    const result = await models.roomDetailModel.findAll({
      where: {
        hotel_id: hotelId,
      },
    });

    const dataValuesArray = result.map((instance) => instance.dataValues);
    return dataValuesArray;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
// get all room by hotelowner id
module.exports.getAllRoomsByHotelOwnerId = async (hotelId) => {
  try {
    const result = await models.roomDetailModel.findAll({
      include: [
        {
          model: models.hotelDetailModel,
          where: { owner_id: ownerId },
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

// add new room_detail
// 1-> hotelownerdashboard addnew room ->hotelowner adds new room
module.exports.addNewRoom = async (data) => {
  try {
    const result = await models.roomDetailModel.create({
      room_size: data.room_size,
      bed_size: data.bed_size,
      max_people_accomodate: data.max_people_accomodate,
      base_fare: data.base_fare,
      ac_non_ac: data.ac_non_ac,
      hotel_id: data.hotel_id,
    });
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// update exiting room_detail by id
// 1->hotelownerdashboard update room->  hotelowner updates room by id
module.exports.updateExistingRoom = async (data) => {
  try {
    const [updatedRows] = await models.roomDetailModel.update(
      {
        room_size: data.room_size,
        bed_size: data.bed_size,
        max_people_accomodate: data.max_people_accomodate,
        base_fare: data.base_fare,
        ac_non_ac: data.ac_non_ac,
      },
      {
        where: {
          room_id: data.room_id,
        },
      }
    );
    return updatedRows; //no of updated items
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// delete room_detail by id
// 1->hotelownerdashboard delete room-> hotelowner deletes existing room by id
module.exports.deleteExistingRoom = async (id) => {
  try {
    const deletedRows = await models.roomDetailModel.destroy({
      where: {
        room_id: id,
      },
    });
    return deletedRows; //noofitems or 0
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// *********************************************************

// get all rooms by hotelid, checkindate and checkoutdate   -> when someone clicks inside a hotel
module.exports.getRoomByInput = async (data) => {
  try {
    //find booked rooms within the given date range
    const bookedRooms = await models.bookingDescriptionModel.findAll({
      where: {
        checkin_date: { [Op.lte]: data.inputCheckinDate },
        checkout_date: { [Op.gte]: data.inputCheckoutDate },
      },
      attributes: ["room_id"],
    });
    const bookedRoomIds = bookedRooms.map(
      (booking) => booking.dataValues.room_id
    );
    console.log(bookedRoomIds);
    //find available rooms for the given hotel ID
    const availableRooms = await models.roomDetailModel.findAll({
      where: {
        hotel_id: data.hotel_id,
        room_id: { [Op.notIn]: bookedRoomIds },
      },
    });
    let availableRoomsList = availableRooms.map(
      (instance) => instance.dataValues
    );
    return availableRoomsList;
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    return "FAILURE";
  }
};
