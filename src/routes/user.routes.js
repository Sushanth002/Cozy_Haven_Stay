const { Router } = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
  searchHotelsByLocation,
  makeRoomReservation,
  bookingHistory,
  cancelRegistration,
  addReview,
  getAllReviewByHotelId,
  getAllReviewByUserId,
  getAllReviewByBookingId,
} = require("../controllers/user/user.controller.js");
const {
  updateUserDetail,
  getFutureBookings
} = require("../controllers/user/userDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const { userRegistrationValidationRules,
        loginValidation,
        updateUserValididation,
        postReviewValidation, 
        validate 
      } = require('../middlewares/validation.middleware.js');

const router = Router();

router.route("/register").post(userRegistrationValidationRules(),validate,userRegister);
router.route("/login").post(loginValidation(),validate,userLogin);
router.route("/logout").post(verifyJWT,userLogout);
router.route("/dashboard/update-user/:user_id").post(verifyJWT,updateUserValididation(),validate,updateUserDetail);
//router.route("/HotelsByLoc/:location/:checkinDate/:checkoutDate").get(searchHotelsByLocation);
router.route("/HotelsByLoc/:location/:checkinDate/:checkoutDate/:numberOfRooms").get(searchHotelsByLocation);
//HotelsByLoc/:location/:checkinDate/:checkoutDate/:no of rooms--all holtels where no of rooms  more than user specified no of rooms
// HotelsAsPerUserInputSearch/:hotel:id/checkinDate/:checkoutDate--it will fetch all rooms which are available 
//router.route("/booking").post(makeRoomReservation);
router.route("/dashboard/future-bookings/:user_id").get(verifyJWT,getFutureBookings);
router.route("/dashboard/cancel-booking/:booking_id").get(verifyJWT,cancelRegistration);
router.route("/dashboard/bookingHistory/:user_id").get(verifyJWT,bookingHistory);
router.route("/history/add-reviews").post(verifyJWT,postReviewValidation(),validate,addReview);
router.route("/history/reviews-by-hotel-id/:hotel_id").get(verifyJWT,getAllReviewByHotelId);
router.route("/history/reviews-by-user-id/:user_id").get(verifyJWT,getAllReviewByUserId);
router.route("/history/reviews-by-booking-id/:booking_id").get(verifyJWT,getAllReviewByBookingId);

//secured routes (jwt verification needed)
//router.route("/logout").post(userLogout);

module.exports = router;
