const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const ownerLogger = require("../../../logger/ownerLogger/index");

const hotelOwnerService = require("../../services/hotel/hotel_owner_detail.service");
const hotelService = require("../../services/hotel/hotel.service");
const bookingService = require("../../services/booking/booking.service");
const RoomService = require("../../services/hotel/room.service");

const { validationResult } = require("express-validator");

// update owner_detail
module.exports.updateOwnerDetail = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = [];
      errors
        .array()
        .map((err) => formattedErrors.push({ [err.path]: err.msg }));

      return res.status(422).json({
        success: false,
        errors: formattedErrors,
      });
    }

    let { owner_id: owner_authid } = req.auth;
    let data = req.body;

    if (owner_authid !== data.owner_id) {
      ownerLogger.error(
        ` updateOwnerDetail-> $USER_ID=[${owner_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }

    let result = await hotelOwnerService.updateHotelOwner(data);
    if (result == "FAILURE") {
      ownerLogger.error(
        `updateOwnerDetail -> $OWNER_ID=[${owner_authid}] : Couldnot update hotelowner in database `
      );
      throw new ApiError(500, "Couldnot update hotelowner in database ");
    }

    ownerLogger.info(
      `updateOwnerDetail -> $OWNER_ID=[${owner_authid}] : hotelowner updated`
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(new ApiResponse(200, "", " hotelowner updated"));
  } catch (error) {
    throw error;
  }
});

// #########HOTEL############
// add new hotel_detail
module.exports.addNewHotelDetail = AsyncHandler(async (req, res) => {
  try {
    // console.log("#####START########");
    let { owner_id: owner_authid } = req.auth;
    let data = req.body;

    if (owner_authid !== data.owner_id) {
      console.log("#############################");
      ownerLogger.error(
        ` ownerLogout-> $OWNER_ID=[${owner_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }

    // adding hotel data to hotel_detail table
    let hotelInsertResult = await hotelService.addNewHotel(data);
    if (hotelInsertResult == "FAILURE") {
      ownerLogger.error(
        `addNewHotelDetail -> $OWNER_ID=[${owner_authid}] : Couldnot add new hotel in database `
      );
      throw new ApiError(500, "Couldnot add new hotel in database ");
    }

    ownerLogger.info(
      `addNewHotelDetail -> $OWNER_ID=[${owner_authid}] : new hotel added`
    );
    // console.log("#####END########");

    return res
      .status(200)
      .json(new ApiResponse(200, hotelInsertResult, "new hotel added "));
  } catch (error) {
    throw error;
  }
});

// update exsiting hotel_detail by id
module.exports.updateHotelDetail = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let data = req.body;

    if (owner_authid !== data.owner_id) {
      console.log("#############################");
      ownerLogger.error(
        ` ownerLogout-> $OWNER_ID=[${owner_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }

    //##############
    let hotelUpdateResult = await hotelService.updateHotelDetail(data);
    if (hotelUpdateResult === "FAILURE") {
      ownerLogger.error(
        `updateHotelDetail -> $OWNER_ID=[${owner_authid}] : Couldnot  update hotel in database`
      );
      throw new ApiError(500, "Couldnot  update hotel in database ");
    }
    ownerLogger.info(
      `updateHotelDetail -> $OWNER_ID=[${owner_authid}] :  hotel+amenity updated`
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(new ApiResponse(200, "", " hotel+amenity updated"));
  } catch (error) {
    throw error;
  }
});


//hotel owner details by owner_id
module.exports.getOwnerDetailByOwnerId = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let ownerid = parseInt(req.params.ownerid);
    let ownerData = await hotelOwnerService.getHotelOwnerById(ownerid);
    if (ownerData == "FAILURE") {
      ownerLogger.error(
        `getOwnerDetailByOwnerId -> $OWNER_ID=[${owner_authid}] : Couldnot fetch owner detail from database`
      );
      throw new ApiError(500, "Couldnot fetch owner detail from database ");
    }

    ownerLogger.info(
      `getOwnerDetailByOwnerId -> $OWNER_ID=[${owner_authid}] : fetched owner detail successfully `
    );
    delete ownerData.refresh_token;
    delete ownerData.password;
    // console.log("#########END############");
    return res
      .status(200)
      .json(
        new ApiResponse(200, ownerData, "fetched owner detail successfully ")
      );
  } catch (error) {
    throw error;
  }
});

// get hotel by hotel_owner id
module.exports.getHotelDetailByOwnerId = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let ownerid = parseInt(req.params.ownerid);
    if (owner_authid !== ownerid) {
      console.log("#############################");
      ownerLogger.error(
        ` ownerLogout-> $OWNER_ID=[${owner_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }

    let hotelData = await hotelService.getHotelDetailById(ownerid);
    if (hotelData == "FAILURE") {
      ownerLogger.error(
        `getHotelDetailByOwnerId -> $OWNER_ID=[${owner_authid}] : Couldnot fetch hotel detail from database`
      );
      throw new ApiError(500, "Couldnot fetch hotel detail from database ");
    }

    ownerLogger.info(
      `getHotelDetailByOwnerId -> $OWNER_ID=[${owner_authid}] : fetched hotel detail successfully `
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(
        new ApiResponse(200, hotelData, "fetched hotel detail successfully ")
      );
  } catch (error) {
    throw error;
  }
});

// ######ROOM##############
// get all room by hotelid
module.exports.getAllRoomDetailByHotelId = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;

    let hotelid = parseInt(req.params.hotelid);
    // if (owner_authid !== ownerid) {
    //   console.log("#############################");
    //   ownerLogger.error(
    //     ` ownerLogout-> $OWNER_ID=[${owner_authid}] : unauthorized access`
    //   );
    //   throw new ApiError(401, "unauthorized access");
    // }

    let result = await RoomService.getAllRoomsByHotelId(hotelid);
    if (result == "FAILURE") {
      ownerLogger.error(
        `getAllRoomDetailByHotelId -> $OWNER_ID=[${owner_authid}] : Couldnot fetch all rooms from database`
      );
      throw new ApiError(500, "Couldnot fetch all rooms from database ");
    }

    ownerLogger.info(
      `getAllRoomDetailByHotelId -> $OWNER_ID=[${owner_authid}] : fetched all room by hotelownerid`
    );
    // console.log("#########END############");

    return res
      .status(200)
      .json(new ApiResponse(200, result, " fetched all room by hotelownerid"));
  } catch (error) {
    throw error;
  }
});
// get room by roomid
module.exports.getRoomDetailByRoomId = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let roomid = parseInt(req.params.roomid);

    // if (owner_authid !== ownerid) {
    //   console.log("#############################");
    //   ownerLogger.error(
    //     ` ownerLogout-> $OWNER_ID=[${owner_authid}] : unauthorized access`
    //   );
    //   throw new ApiError(401, "unauthorized access");
    // }

    let result = await RoomService.getRoomById(roomid);
    if (result == "FAILURE") {
      ownerLogger.error(
        `getRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : Couldnot fetch given room from database`
      );
      throw new ApiError(500, "Couldnot fetch given room from database ");
    }
    ownerLogger.info(
      `getRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : fetched roomdetail by roomid`
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(new ApiResponse(200, result, "fetched roomdetail by roomid"));
  } catch (error) {
    throw error;
  }
});

// add new room
module.exports.addRoomDetail = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let data = req.body;

    if (owner_authid !== data.owner_id) {
      console.log("#############################");
      ownerLogger.error(
        ` ownerLogout-> $OWNER_ID=[${owner_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }

    let result = await RoomService.addNewRoom(data);
    if (result == "FAILURE") {
      ownerLogger.error(
        `addRoomDetail -> $OWNER_ID=[${owner_authid}] : Couldnot add given room in database`
      );
      throw new ApiError(500, "Couldnot add given room in database ");
    }

    ownerLogger.info(
      `addRoomDetail -> $OWNER_ID=[${owner_authid}] : added roomdetail successfully`
    );
    // console.log("#########END############");

    return res
      .status(200)
      .json(new ApiResponse(200, result, "added roomdetail successfully "));
  } catch (error) {
    throw error;
  }
});

// delete room_detail by id
module.exports.deleteRoomDetailByRoomId = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let roomid = parseInt(req.params.roomid);

    // if (owner_authid !== data.owner_id) {
    //   console.log("#############################");
    //   ownerLogger.error(
    //     ` ownerLogout-> $OWNER_ID=[${owner_authid}] : unauthorized access`
    //   );
    //   throw new ApiError(401, "unauthorized access");
    // }

    let result = await RoomService.deleteExistingRoom(roomid);
    if (result === 0) {
      ownerLogger.error(
        `deleteRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : No room given id found`
      );
      throw new ApiError(500, "No room given id found ");
    }
    if (result == "FAILURE") {
      ownerLogger.error(
        `deleteRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : Couldnot delete room in  database`
      );
      throw new ApiError(500, "Couldnot delete room in  database ");
    }

    ownerLogger.info(
      `deleteRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] :deleted given room successfully`
    );
    // console.log("#########END############");

    return res
      .status(200)
      .json(new ApiResponse(200, " deleted given room successfully"));
  } catch (error) {
    throw error;
  }
});
// update room by roomid
module.exports.updateRoomDetailByRoomId = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let data = req.body;

    if (owner_authid !== data.owner_id) {
      console.log("#############################");
      ownerLogger.error(
        ` ownerLogout-> $OWNER_ID=[${owner_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }

    let result = await RoomService.updateExistingRoom(data);
    if (result == "FAILURE") {
      ownerLogger.error(
        `updateRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : Couldnot update room in database`
      );
      throw new ApiError(500, "Couldnot update room in database ");
    }

    ownerLogger.info(
      `updateRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : updated  room by roomid`
    );
    // console.log("#########END############");

    return res
      .status(200)
      .json(new ApiResponse(200, " updated  room by roomid"));
  } catch (error) {
    throw error;
  }
});

// ######BOOKING##############
//get all past booking by hotelid
module.exports.getPastBooking = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let hotelid = parseInt(req.params.hotelid);
    let { owner_id: owner_authid } = req.auth;

    // if (owner_authid !== data.owner_id) {
    //   ownerLogger.error(
    //     ` getPastBooking-> $OWNER_ID=[${owner_authid}] : unauthorized access`
    //   );
    //   throw new ApiError(401, "unauthorized access");
    // }

    console.log(hotelid);
    let pastBookings = await bookingService.getPastBookingByHotelID(hotelid);
    if (pastBookings === "FAILURE") {
      ownerLogger.error(
        `getPastBooking -> $OWNER_ID=[${owner_authid}] : Couldnot fetch past bookings `
      );
      throw new ApiError(500, "Couldnot fetch past bookings");
    }

    ownerLogger.info(
      `getPastBooking -> $USER_ID=[${owner_authid}] : fetched past booking successfully`
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(
        new ApiResponse(200, pastBookings, "fetched past booking successfully")
      );
  } catch (error) {
    throw error;
  }
});
// get current booking by hotelid
module.exports.getCurrentBooking = AsyncHandler(async (req, res) => {
  try {
    console.log("#########START############");
    let hotelid = parseInt(req.params.hotelid);
    let { owner_id: owner_authid } = req.auth;

    // if (owner_authid !== data.owner_id) {
    //   ownerLogger.error(
    //     ` getCurrentBooking-> $OWNER_ID=[${owner_authid}] : unauthorized access`
    //   );
    //   throw new ApiError(401, "unauthorized access");
    // }

    let currentBookings = await bookingService.getCurrentBookingByHotelID(
      hotelid
    );
    if (currentBookings === "FAILURE") {
      ownerLogger.error(
        `getCurrentBooking -> $OWNER_ID=[${owner_authid}] : Couldnot fetch current bookings `
      );
      throw new ApiError(500, "Couldnot fetch current bookings");
    }

    ownerLogger.info(
      `getCurrentBooking -> $USER_ID=[${owner_authid}] : fetched current booking successfully`
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          currentBookings,
          "fetched current booking successfully"
        )
      );
  } catch (error) {
    throw error;
  }
});
// update booking status
module.exports.updateBookingStatus = AsyncHandler(async (req, res) => {
  try {
    console.log("###########START#################");
    let data = req.body;
    console.log(data);
    let { owner_id: owner_authid } = req.auth;

    if (owner_authid !== data.owner_id) {
      ownerLogger.error(
        ` updateBookingStatus-> $OWNER_ID=[${owner_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }
    console.log("*****************************************");
    let updateResult = await bookingService.updateBookingDetail(data);
    if (updateResult === "FAILURE") {
      ownerLogger.error(
        ` updateBookingStatus-> $OWNER_ID=[${owner_authid}] : couldnot update status of booking`
      );
      throw new ApiError(500, "couldnot update status of booking");
    }
    console.log("*****************************************");

    ownerLogger.info(
      `updateBookingStatus -> $OWNER_ID=[${owner_authid}] : updated booking status `
    );
    console.log("#########END############");
    return res
      .status(200)
      .json(new ApiResponse(200, "", "updated booking status"));
  } catch (error) {
    throw error;
  }
});
