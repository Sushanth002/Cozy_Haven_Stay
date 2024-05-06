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
} = require("../controllers/owner/ownerDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router();

// ##########owner##################
// unsecured routes
router.route("/register").post(ownerRegister);
router.route("/login").post(ownerLogin);
//secured routes (jwt verification needed)
router.route("/logout/:ownerid").post(verifyJWT, ownerLogout);
router.route("/dashboard/update-owner").put(verifyJWT, updateOwnerDetail);
// ###########hotel##########
router.route("/dashboard/add-new-hotel").post(verifyJWT, addNewHotelDetail);
router.route("/dashboard/update-hotel").put(verifyJWT, updateHotelDetail);
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
router.route("/dashboard/add-new-room").post(verifyJWT, addRoomDetail);
router
  .route("/dashboard/delete-room/:roomid")
  .delete(verifyJWT, deleteRoomDetailByRoomId);
router.route("/dashboard/update-room").put(verifyJWT, updateRoomDetailByRoomId);
//###########booking############
router
  .route("/dashboard/booking/past-booking/:hotelid")
  .put(verifyJWT, getPastBooking);
router
  .route("/dashboard/booking/current-booking/:hotelid")
  .put(verifyJWT, getCurrentBooking);
router
  .route("/dashboard/booking/current-booking/update-status")
  .put(verifyJWT, updateBookingStatus);

module.exports = router;
