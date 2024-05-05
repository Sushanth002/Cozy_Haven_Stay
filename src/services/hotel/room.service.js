const db = require("../../config/dbconfig");
const models = require("../../models/index");

// get room by room id
module.exports.getRoomById = async () => {
  try {
    const result = await RoomDetail.findByPk(roomId);
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
// get all room by hotel id
module.exports.getAllRoomsByHotelId = async (hotelId) => {
  try {
    const result = await RoomDetail.findAll({
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
    const result = await RoomDetail.findAll({
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
