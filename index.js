// const userModule=require('./user');

// //Successfully creating user account
// userModule.createUser("sushanth","Sushanth@123","sushanth@gmail.com","M","1234567890","A.P");

// //Error creating user account
// userModule.createUser("sushanth","Sushanth@123","sushanth@gmail.com","","1234567890","A.P");

// //Valid user details
// userModule.isValidUser("sushanth","Sushanth@123");

// //Invalid details
// userModule.isValidUser("sushanth","admin@123");
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//day 10
const userService = require('./src/services/user.service');

async function main()
{

    //to get all users----

//    let results  = await   userService.getAllUser();
   
//    for(let item of results)
//    {
//     console.log(item.user_id, item.user_name);
//    }

   //register user------

   console.log("-----------------------------------------------------------------------");

//    let addUserResult = await userService.registerUser({
//     user_name: 'test',
//     password: 'password123',
//     email: 'test@gmail.com',
//     gender: 'Male',
//     contact_no: '1111111111',
//     address: 'Hyd'
// });
//     console.log('User added successfully');

    //Search Hotels-----

    // let location="Banglore";

    // await userService.searchHotels(location).
    // then(hotels => {
    //     let hotelNames=hotels.map(hotel=>hotel.hotel_name);
    //     console.log('Found hotels:', hotelNames);
    // })
    // .catch(error => console.error('Error searching hotels:', error));

    // Select hotel and make room reservation-----

    // const userId = 5; 
    // const hotelId = 1;
    // const roomIds = [2, 2]; 
    // const checkinDate = '2024-04-23'; 
    // const checkoutDate = '2024-04-25';

    // await userService.makeReservation(userId, hotelId, roomIds, checkinDate, checkoutDate)
    // .then(({ booking, bookingDescriptions, totalBookingAmount }) => {
    //     console.log('Reservation made successfully:');
    //     console.log('Booking ID:', booking.booking_id);
    //     console.log('User ID:', booking.user_id);
    //     console.log('Hotel ID:', booking.hotel_id);
    //     console.log('Check-in Date:', booking.checkin_date);
    //     console.log('Checkout Date:', booking.checkout_date);
    //     console.log('Booking Status:', booking.booking_status);
    //     console.log('Booking Descriptions:');
    //     bookingDescriptions.forEach((bookingDescription, index) => {
    //         console.log('Description', index + 1);
    //         console.log('Room ID:', bookingDescription.room_id);
    //         console.log('Check-in Date:', bookingDescription.checkin_date);
    //         console.log('Checkout Date:', bookingDescription.checkout_date);
    //         console.log('-----------------------');
    //     });

    //     console.log('Total Booking Amount:', totalBookingAmount);
    // })
    // .catch(error => console.error('Error making reservation:', error));


    // cancel reservation

    // //const userId = 1;
    // const bookingIdToCancel = 4; // Replace this with the booking ID you want to cancel

    //  await userService.cancelReservation(bookingIdToCancel)
    // .then((cancelledBooking) => {
    //     console.log('Reservation cancelled successfully:');
    //     console.log('Cancelled Booking ID:', cancelledBooking.booking_id);
    // })
    // .catch(error => console.error('Error cancelling reservation:', error));

    // view bookings by id------
    
    const userId = 1;

  await userService.viewReservationHistory(userId)
  .then((bookings) => {
    console.log('Reservation History:');
    bookings.forEach((booking, index) => {
      console.log(`Booking ${index + 1}:`);
      console.log('Booking ID:', booking.booking_id);
      console.log('Hotel ID:', booking.hotel_id);
      console.log('Check-in Date:', booking.checkin_date);
      console.log('Checkout Date:', booking.checkout_date);
      console.log('Booking Status:', booking.booking_status);
      console.log('=======================');
    });
  })
  .catch(error => console.error('Error viewing reservation history:', error));



   process.exit();
}

main();