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
  getAllRoomDetailByOwnerId,
  deleteRoomDetailByRoomId,
  updateRoomDetailByRoomId,
} = require("../controllers/owner/ownerDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router();

router.route("/register").post(ownerRegister);
//secured routes (jwt verification needed)
router.route("/login").post(ownerLogin);
router.route("/logout").post(ownerLogout);
router.route("/dashboard/update-owner").post(updateOwnerDetail);
router.route("/dashboard/add-new-hotel").post(addNewHotelDetail);
router.route("/dashboard/update-hotel").patch(updateHotelDetail);
router.route("/dashboard/get-hotel/:ownerid").get(getHotelDetailByOwnerId);
router.route("/dashboard/get-rooms/:ownerid").get(getAllRoomDetailByOwnerId);
router.route("/dashboard/delete-room/:roomid").delete(deleteRoomDetailByRoomId);
router.route("/dashboard/update-room/:roomid").put(updateRoomDetailByRoomId);

module.exports = router;
