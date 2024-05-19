const { Router } = require("express");
const {
  ownerRegister,
  ownerLogin,
  ownerLogout,
} = require("../controllers/owner/owner.controller");
const {
  updateOwnerDetail,
  addNewHotelDetail,
  updateHotelDetail,
  getHotelDetailByOwnerId,
  getAllRoomDetailByHotelId,
  getRoomDetailByRoomId,
  addRoomDetail,
  deleteRoomDetailByRoomId,
  updateRoomDetailByRoomId,
  getPastBooking,
  getCurrentBooking,
  updateBookingStatus,
  getOwnerDetailByOwnerId
} = require("../controllers/owner/ownerDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const {
  ownerRegisterValidator,
  ownerUpdateValidator,
  ownerLoginValidator,
  hotelAddValidation,
  roomAddValidation,
} = require("../middlewares/validation.middleware.js");
const router = Router();

// ##########owner##################
// unsecured routes
router.route("/register").post(ownerRegisterValidator, ownerRegister);
router.route("/login").post(ownerLoginValidator, ownerLogin);
//secured routes (jwt verification needed)
router.route("/logout/:ownerid").post(verifyJWT, ownerLogout);
router.route("/dashboard/:ownerid").get(verifyJWT, getOwnerDetailByOwnerId);
router
  .route("/dashboard/update-owner")
  .put(ownerUpdateValidator, verifyJWT, updateOwnerDetail);
// ###########hotel##########
router
  .route("/dashboard/add-new-hotel")
  .post(hotelAddValidation, verifyJWT, addNewHotelDetail);
router
  .route("/dashboard/update-hotel")
  .put(hotelAddValidation, verifyJWT, updateHotelDetail);
router
  .route("/dashboard/get-hotel/:ownerid")
  .get(verifyJWT, getHotelDetailByOwnerId);
//###########room############
router
  .route("/dashboard/get-all-room/:hotelid")
  .get(verifyJWT, getAllRoomDetailByHotelId);
router
  .route("/dashboard/get-room/:roomid")
  .get(verifyJWT, getRoomDetailByRoomId);
router
  .route("/dashboard/add-new-room")
  .post(roomAddValidation, verifyJWT, addRoomDetail);
router
  .route("/dashboard/delete-room/:roomid")
  .delete(verifyJWT, deleteRoomDetailByRoomId);
router
  .route("/dashboard/update-room")
  .put(roomAddValidation, verifyJWT, updateRoomDetailByRoomId);
//###########booking############
router
  .route("/dashboard/booking/past-booking/:hotelid")
  .get(verifyJWT, getPastBooking);
router
  .route("/dashboard/booking/current-booking/update-status")
  .put(verifyJWT, updateBookingStatus);
router
  .route("/dashboard/booking/current-booking/:hotelid")
  .get(verifyJWT, getCurrentBooking);

module.exports = router;
