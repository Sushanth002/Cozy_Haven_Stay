const { Router } = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
} = require("../controllers/user/user.controller.js");
const {
  updateUserDetail,
  getPastBooking,
  addReviewToHotel,
  getCurrentBooking,
  cancelBookingByBookingID,
} = require("../controllers/user/userDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router();

// ##########user##################
// unsecured routes
router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
//secured routes (jwt verification needed)
router.route("/logout/:userid").post(verifyJWT, userLogout);
router.route("/dashboard/update-user").post(verifyJWT, updateUserDetail);
// ########booking#######
router
  .route("/dashboard/booking/past-bookings/add-review")
  .post(verifyJWT, addReviewToHotel);
router
  .route("/dashboard/booking/past-bookings/get-by-user/:userid")
  .get(verifyJWT, getPastBooking);
router
  .route("/dashboard/booking/current-booking/cancel-booking")
  .put(verifyJWT, cancelBookingByBookingID);
router
  .route("/dashboard/booking/current-booking/:userid")
  .get(verifyJWT, getCurrentBooking);
//router.route("/newbooking").post(verifyJWT, createNewBooking);

module.exports = router;
