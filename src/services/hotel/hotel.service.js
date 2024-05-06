const db = require("../../config/dbconfig");
const models = require("../../models/index");
const { Op } = require("sequelize");

// add new hotel_detail
// 1-> hotelownerdashboard addnew hotel (ifnotexist)->hotelowner adds new hotel
module.exports.addNewHotel = async (data) => {
  try {
    let result = await models.hotelDetailModel.create(data);
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// update exsiting hotel_detail by id
// 1-> hotelownerdashboard update hotel detail (ifexist)->hotelowner updates existing hotel
module.exports.updateHotelDetail = async (data) => {
  try {
    const [result] = await models.hotelDetailModel.update(
      {
        hotel_name: data.hotel_name,
        location: data.location,
        address: data.address,
        parking: data.parking,
        wifi: data.wifi,
        room_service: data.room_service,
        swimming_pool: data.swimming_pool,
        fitness_center: data.fitness_center,
        dining: data.dining,
      },
      {
        where: {
          hotel_id: data.hotel_id,
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// get hotel by hotel_owner id
// 1-> hotelowner dashboard hotel detail-> display hotel detail
module.exports.getHotelDetailById = async (id) => {
  try {
    const result = await models.hotelDetailModel.findOne({
      where: {
        owner_id: id,
      },
    });
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// ******************************************************

// get all hotel by hotel_owner
// 1-> admindashborard -> display all hotels

// get all hotel by hotel location

// get all hotel by (hotelloc+noofrooms+checkindate+checkoutdate)
module.exports.getHotelByInput = async (data) => {
  try {
    // find count of all rooms as per hotel where checkinand checkout date lies between input dates
    // use table bookingdetail

    const bookedHotels = models.bookingDetailModel.findAll({
      attributes: [
        "hotel_id",
        [
          sequelize.fn("SUM", sequelize.col("no_rooms")),
          "total_noof_bookedrooms",
        ],
      ],
      where: {
        checkin_date: {
          [Op.between]: [data.inputCheckinDate, data.inputCheckoutDate],
        },
        checkout_date: {
          [Op.between]: [data.inputCheckinDate, data.inputCheckoutDate],
        },
        booking_status: "BOOKED",
      },
      group: ["hotel_id"],
    });
    let BookedHotelArray;
    if (bookedHotels) {
      BookedHotelArray = bookedHotels.map((instance) => instance.dataValues);
    }

    // find count of all rooms in all hotel with given location
    // use hotel_detail roomdetail
    const allhotelsByLocation = await models.hotelDetailModel.findAll({
      where: { location: data.inputLocation },
      include: [
        {
          model: models.roomDetailModel,
          required: false,
          attributes: [
            [
              sequelize.fn("COUNT", sequelize.col("RoomDetails.room_id")),
              "total_noof_rooms",
            ],
          ],
        },
      ],
      group: ["hotel_id"],
    });
    let formattedAllHotelsByLocation;
    if (formattedAllHotelsByLocation) {
      formattedAllHotelsByLocation = allhotelsByLocation.map((hotel) => ({
        hotel_id: hotel.hotel_id,
        hotel_name: hotel.hotel_name,
        location: hotel.location,
        address: hotel.address,
        parking: hotel.parking,
        wifi: hotel.wifi,
        room_service: hotel.room_service,
        swimming_pool: hotel.swimming_pool,
        fitness_center: hotel.fitness_center,
        dining: hotel.dining,
        owner_id: hotel.owner,
        total_noof_rooms:
          hotel.RoomDetails.length > 0
            ? hotel.RoomDetails[0].dataValues.total_noof_rooms
            : 0,
      }));
    } else {
      return null;
    }

    // format result to include hoteldetail and noof unbooked rooms if its greater than user no of rooms
    const output = [];

    formattedAllHotelsByLocation.forEach((hotel) => {
      const hotelId = hotel.hotel_id;
      const totalNoOfRooms = hotel.total_noof_rooms;

      const bookedRoomsEntry = bookedHotels.find(
        (entry) => entry.hotel_id === hotelId
      );

      if (bookedRoomsEntry) {
        const totalBookedRooms = bookedRoomsEntry.total_noof_bookedrooms;
        const notBookedRooms = totalNoOfRooms - totalBookedRooms;
        if (notBookedRooms >= data.inputNoOfRooms) {
          output.push({ ...hotel, total_noof_rooms_notbooked: notBookedRooms });
        }
      }
    });
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
// 1->home page
