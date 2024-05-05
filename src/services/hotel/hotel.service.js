const db = require("../../config/dbconfig");
const { Sequelize } = require("sequelize");
const models = require("../../models/index");


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
module.exports.addNewHotelAmenity = async (data) => {
  try {
    const result = await models.hotelAmenityModel.create({
      hotel_id: data.hotel_id,
      parking: data.parking,
      wifi: data.wifi,
      room_service: data.room_service,
      swimming_pool: data.swimming_pool,
      fitness_center: data.fitness_center,
      dining: data.dining,
    });
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
module.exports.updateHotelAmenityById = async (data) => {
  try {
    const [result] = await models.hotelAmenityModel.update(
      {
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
module.exports.getHotelAmenityById = async (id) => {
  try {
    const result = await models.hotelAmenityModel.findOne({
      where: {
        hotel_id: id,
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

module.exports.searchHotels = async (location) => {
  try {
    //console.log("Searching for hotels in:", location);
    const hotels = await models.hotelDetailModel.findAll({ where: { location } });
    // Map the array of Sequelize instances to an array of data values
    //console.log("Hotels found:", hotels);
    const hotelsData = hotels.map(hotel => hotel.toJSON());
    return hotelsData;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// get all hotel by (hotelloc+noofrooms+checkindate+checkoutdate)


// module.exports.searchHotels = async (location, checkinDate, checkoutDate) => {
//   try {
//     // Find hotels based on the given location
//     const hotels = await models.hotelDetailModel.findAll({
//       where: {
//         location: location,
//       },
//     });

//     if (!hotels || hotels.length === 0) {
//       // If no hotels found for the given location, return empty array
//       return 'Hotels not found';
//     }

//     // Iterate through each hotel to check if there are any bookings for the provided check-in and check-out dates
//     const availableHotels = await Promise.all(hotels.map(async (hotel) => {
//       const bookings = await models.bookingDetailModel.findOne({
//         where: {
//           hotel_id: hotel.hotel_id,
//           checkin_date: checkinDate,
//           checkout_date: checkoutDate,
//         },
//       });

//       // If no booking found for the given dates, return the hotel details
//       if (!bookings) {
//         return hotel;
//       }

//       return null;
//     }));

//     // Filter out the hotels which have bookings for the provided dates
//     const filteredHotels = availableHotels.filter((hotel) => hotel !== null);

//     if (filteredHotels.length === 0) {
//       // If no hotels available for the provided dates, return empty array
//       return 'Hotels not found';
//     }

//     return filteredHotels;
//   } catch (error) {
//     console.error('Error searching hotels:', error);
//     throw new Error('Failed to search hotels');
//   }
// };

// // 1->home page

// module.exports.searchHotels = async (location, checkinDate, checkoutDate) => {
//   try {
//     // Find hotels based on the provided location
//     const hotels = await models.hotelDetailModel.findAll({
//       where: {
//         location: location,
//       },
//     });

//     if (!hotels || hotels.length === 0) {
//       // If no hotels found for the given location, return "Hotels not found"
//       return "Hotels not found";
//     }

//     // Check availability for each hotel
//     const availableHotels = [];
//     for (const hotel of hotels) {
//       // Check if there are any bookings for the provided dates for this hotel
//       const bookings = await models.bookingDetailModel.findAll({
//         where: {
//           hotel_id: hotel.hotel_id,
//           checkin_date: { [Sequelize.Op.lte]: checkoutDate },
//           checkout_date: { [Sequelize.Op.gte]: checkinDate },
//         },
//       });

//       // If no bookings found for the provided dates, add the hotel to available hotels
//       if (!bookings || bookings.length === 0) {
//         availableHotels.push(hotel);
//       }
//     }

//     if (availableHotels.length === 0) {
//       // If no hotels available for the provided dates, return "Hotels not found"
//       return "Hotels not found";
//     }

//     // Return the list of available hotels
//     return availableHotels;
//   } catch (error) {
//     console.error('Error searching hotels:', error);
//     throw new Error('Failed to search hotels');
//   }
// };


module.exports.searchHotels = async (location, checkinDate, checkoutDate, numberOfRooms) => {
  try {
    // Find hotels based on the provided location
    const hotels = await models.hotelDetailModel.findAll({
      where: {
        location: location,
      },
    });

    if (!hotels || hotels.length === 0) {
      // If no hotels found for the given location, return "Hotels not found"
      return "Hotels not found";
    }

    // Calculate total rooms for each hotel
    const hotelRoomCounts = await models.roomDetailModel.findAll({
      attributes: ['hotel_id', [Sequelize.fn('COUNT', Sequelize.col('hotel_id')), 'total_rooms']],
      group: ['hotel_id'],
    });

    console.log("total rooms"+hotelRoomCounts);

    // Create a map to store hotel IDs and their corresponding total rooms
    const hotelRoomMap = new Map();
    hotelRoomCounts.forEach(({ hotel_id, total_rooms }) => {
      hotelRoomMap.set(hotel_id, total_rooms);
    });

    // Check availability for each hotel
    const availableHotels = [];
    for (const hotel of hotels) {
      const totalRooms = hotelRoomMap.get(hotel.hotel_id) || 0;

      // Check if there are any bookings for the provided dates for this hotel
      const bookings = await models.bookingDetailModel.findAll({
        where: {
          hotel_id: hotel.hotel_id,
          checkin_date: { [Sequelize.Op.lte]: checkoutDate },
          checkout_date: { [Sequelize.Op.gte]: checkinDate },
        },
      });

      // Calculate available rooms considering existing bookings
      let availableRooms = totalRooms;
      for (const booking of bookings) {
        // Check if the booking date range overlaps with the requested date range
        if (booking.checkin_date <= checkoutDate && booking.checkout_date >= checkinDate) {
          availableRooms -= booking.no_rooms || 0;
        }
      }

      // If available rooms are greater than or equal to the requested number of rooms, add the hotel to available hotels
      if (availableRooms >= numberOfRooms) {
        availableHotels.push(hotel);
      }
    }

    if (availableHotels.length === 0) {
      // If no hotels available for the provided dates or number of rooms, return "Hotels not found"
      return "Hotels not found";
    }

    // Return the list of available hotels
    return availableHotels;
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw new Error('Failed to search hotels');
  }
};