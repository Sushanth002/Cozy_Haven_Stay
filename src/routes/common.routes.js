const { Router } = require("express");
const router = Router();

const {
  searchHotel,
  getRoomByInput,
  getReviewByHotelID,
} = require("../controllers/common/common.controller");

// ##########common##################
router.route("/search-hotels").get(searchHotel);
router.route("/room").get(getRoomByInput);
router.route("/review/:hotelid").get(getReviewByHotelID);

module.exports = router;
