const { Router } = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
  createNewBooking,
} = require("../controllers/user/user.controller.js");
const {
  updateUserDetail,
  getPastBooking,
  addReviewToHotel,
  getCurrentBooking,
  cancelBookingByBookingID,
  getUserDetailById
} = require("../controllers/user/userDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const {
  userRegistrationValidationRules,
  loginValidation,
  updateUserValididation,
  postReviewValidation,
  bookingValidation,
  validate,
} = require("../middlewares/userValidation.middleware.js");

const router = Router();

// ##########user##################
// unsecured routes
router
  .route("/register")
  .post(userRegistrationValidationRules(), validate, userRegister);
router.route("/login").post(loginValidation(), validate, userLogin);
//secured routes (jwt verification needed)
router.route("/logout/:userid").post(verifyJWT, userLogout);
router
  .route("/dashboard/update-user")
  .post(verifyJWT, updateUserValididation(), validate, updateUserDetail);
  router.route("/dashboard/:userid").get(verifyJWT, getUserDetailById);
// ########booking#######
router
  .route("/dashboard/booking/past-bookings/add-review")
  .post(verifyJWT, postReviewValidation(), validate, addReviewToHotel);
router
  .route("/dashboard/booking/past-bookings/get-by-user/:userid")
  .get(verifyJWT, getPastBooking);
router
  .route("/dashboard/booking/current-booking/cancel-booking")
  .put(verifyJWT, cancelBookingByBookingID);
router
  .route("/dashboard/booking/current-booking/:userid")
  .get(verifyJWT, getCurrentBooking);
router
  .route("/newbooking")
  .post(verifyJWT,  createNewBooking);

module.exports = router;
