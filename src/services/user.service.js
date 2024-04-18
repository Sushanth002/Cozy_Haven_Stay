// const db = require("../database/db");

// // get all users
// // 1->admin dashborad ->user section
// module.exports.getAllUser = async () => {
//   let queryGetAllUser = "SELECT * FROM user_detail";
//   let [allUser] = await db.query(queryGetAllUser);
//   return allUser;
// };

// // get user by id
// // 1->user dashboard -> user profile
// module.exports.getUserById = async (id) => {
//   let queryGetUserById = "SELECT * FROM user_detail WHERE user_id = ?";
//   let [user] = await db.query(queryGetAllUser, [id]);
//   return user;
// };

// // add new user
// // 1->user signup
// module.exports.addNewUser = async (data) => {
//   let queryAddUser = "INSERT INTO user_detail (user_name, password, email, gender, contact_no, address) VALUES (?, ?, ?, ?, ?, ?)";
//   try {
//     let [resultSetHeader] = await db.query(queryAddUser, [
//       data.user_name,
//       data.password,
//       data.email,
//       data.gender,
//       data.contact_no,
//       data.address,
//     ]);
//     if (resultSetHeader.affectedRows == 1) {
//       return "SUCCESS";
//     } else {
//       throw new Error("Error while inserting record in user_detail");
//     }
//   } catch (error) {
//     console.log(error);
//     return "FAILURE";
//   }
// };

// // delete user by id
// // 1->admin dashboard -> admin wants to delete user
// module.exports.deleteUserById = async (id) => {
//   let querydeleteUserById = "DELETE FROM user_detail WHERE user_id = ?";
//   try {
//     let [resultSetHeader] = await db.query(querydeleteUserById, [id]);
//     if (resultSetHeader.affectedRows == 1) {
//       return "SUCCESS";
//     } else {
//       throw new Error("Error while deleting record from user_detail");
//     }
//   } catch (error) {
//     console.log(error);
//     return "FAILURE";
//   }
// };

// // update existing user by id
// // 1-> user dashboard -> user wants to update user_detail
// module.exports.updateUser = async (data) => {
//   let queryUpdateUser = `UPDATE user_detail SET user_name = ?, password= ?, email= ?, gender= ?, contact_no= ?, address= ? WHERE user_id = ? `;

//   try {
//     let [resultSetHeader] = await db.query(queryUpdateUser, [
//       data.user_name,
//       data.password,
//       data.email,
//       data.gender,
//       data.contact_no,
//       data.address,
//       data.user_id,
//     ]);
//     if (resultSetHeader.affectedRows == 1) {
//       return "SUCCESS";
//     } else {
//       throw new Error("Error while updating record in user_detail");
//     }
//   } catch (error) {
//     console.log(error);
//     return "FAILURE";
//   }
// };

// ------------------------------------------------------------using orm---------------------------------------------------------------------------
const { Op } = require("sequelize");
const User = require('../models/user.model');
const Hotel = require('../models/hotel.model');
const Booking = require('../models/booking.model');
const BookingDescription = require('../models/booking_description.model');
const Room = require('../models/room.model');

// User Registration
exports.registerUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw error;
    }
};

// User Login
exports.loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email, password } });
        return user;
    } catch (error) {
        throw error;
    }
};

// Search and view hotels
exports.searchHotels = async (location) => {
    try {
        const hotels = await Hotel.findAll({ where: { location } });
        return hotels;
    } catch (error) {
        throw error;
    }
};

// // Select hotel and make room reservation
// exports.makeReservation = async (userId, hotelId, roomIds, checkinDate, checkoutDate) => {
//   try {
//       // Create a booking with default status 'BOOKED'
//       const booking = await Booking.create({
//           user_id: userId,
//           hotel_id: hotelId,
//           checkin_date: checkinDate,
//           checkout_date: checkoutDate,
//           booking_status: 'BOOKED' // Set default status
//       });

//       // Create booking descriptions for each room
//       const bookingDescriptions = [];
//       for (const roomId of roomIds) {
//           const bookingDescription = await BookingDescription.create({
//               booking_id: booking.booking_id,
//               room_id: roomId,
//               checkin_date: checkinDate,
//               checkout_date: checkoutDate
//           });
//           bookingDescriptions.push(bookingDescription);
//       }

//       return { booking, bookingDescriptions };
//   } catch (error) {
//       throw error;
//   }
// };

exports.makeReservation = async (userId, hotelId, roomIds, checkinDate, checkoutDate) => {
  try {
    // Initialize variables to store total number of rooms and total booking amount
    let totalRooms = 0;
    let totalBookingAmount = 0;
    let bookingDescriptions = [];

    // Create a booking
    const booking = await Booking.create({
      user_id: userId,
      hotel_id: hotelId,
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      booking_status: 'BOOKED'
    });

    // Iterate through each room
    for (const roomId of roomIds) {
      // Find the room details
      const room = await Room.findByPk(roomId);

      // Calculate the number of people staying in the room based on room size and max_people_accomodate
      let numberOfPeople = 0;
      if (room.room_size === 'single') {
        numberOfPeople = 2;
      } else if (room.room_size === 'double') {
        numberOfPeople = 4;
      } else if (room.room_size === 'king') {
        numberOfPeople = 6;
      }

      // Calculate additional charge based on the conditions provided
      let additionalCharge = 0;
      if (room.max_people_accomodate === 2 && numberOfPeople > 2) {
        // If a room contains a single bed, maximum 2 people can stay in room
        // Additional charge is 40% of base fare for each additional person
        additionalCharge = room.base_fare * 0.4;
      } else if (room.max_people_accomodate === 4 && numberOfPeople > 4) {
        // If a room contains a double bed, maximum 4 people can stay in room
        // Additional charge is 40% of base fare for each additional person
        additionalCharge = room.base_fare * 0.4;
      } else if (room.max_people_accomodate === 6 && numberOfPeople > 6) {
        // If a room contains a king size bed, maximum 6 people can stay in room
        // Additional charge is 40% of base fare for each additional person
        additionalCharge = room.base_fare * 0.4;
      }

      // Calculate the booking amount for the room based on the base fare and additional charges
      const bookingAmountRoom = room.base_fare + additionalCharge;

      // Create booking description for the room
      const bookingDescription = await BookingDescription.create({
        booking_id: booking.booking_id,
        room_id: roomId,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        booking_amount_room: bookingAmountRoom
      });

      // Push the booking description to the array
      bookingDescriptions.push(bookingDescription);

      // Increment totalRooms and totalBookingAmount
      totalRooms++;
      totalBookingAmount += bookingAmountRoom;
    }

    // Update the booking with totalRooms and totalBookingAmount
    await booking.update({
      no_rooms: totalRooms,
      total_booking_amount: totalBookingAmount
    });

    return { booking, bookingDescriptions, totalBookingAmount }; // Return both booking and bookingDescriptions
  } catch (error) {
    throw error;
  }
};


// Cancel reservation
exports.cancelReservation = async (bookingId) => {
  try {
      // Find the booking to cancel
      const booking = await Booking.findByPk(bookingId);

      if (!booking) {
          throw new Error('Booking not found');
      }

      // Delete booking description entries associated with the booking
      await BookingDescription.destroy({
          where: {
              booking_id: bookingId
          }
      });

      // Delete the booking
      await booking.destroy();

      return booking;
  } catch (error) {
      throw error;
  }
};

// View reservation history
exports.viewReservationHistory = async (userId) => {
  try {
    // Find all bookings made by the user
    const bookings = await Booking.findAll({
      where: {
        user_id: userId
      }
    });

    return bookings;
  } catch (error) {
    throw error;
  }
};