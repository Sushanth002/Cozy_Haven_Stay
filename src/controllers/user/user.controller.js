const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const userLogger = require("../../../logger/userLogger/index");

const {
  encryptPassword,
  isPasswordCorrect,
} = require("../../utils/bcryptMethods");
const { generateAccessAndRefreshTokens } = require("../../utils/generateToken");

const userService = require("../../services/user/user_detail.service");
const bookingService = require("../../services/booking/booking.service");
const bookingDescriptionService = require("../../services/booking/booking_description.service");

// register new user
module.exports.userRegister = AsyncHandler(async (req, res) => {
  try {
    try {
      // console.log("##########START############################");
      let data = req.body;
      // check if user already present or not
      // encrypt the password

      data.password = await encryptPassword(data.password);
      // create entry in db
      let result = await userService.addNewUser(data);
      if (result == "FAILURE") {
        userLogger.error(
          `userRegister -> $USER_EMAIL=[${data.email}] : Couldnot add new user to database `
        );
        throw new ApiError(500, "Couldnot add new user to database ");
      }

      // remove password and refreshtoken  from response
      delete result.password;
      delete result.refresh_token;

      userLogger.info(
        `userRegister -> $USER_EMAIL=[${data.email}] : new user registered`
      );
      // console.log("##########END############################");
      return res
        .status(200)
        .json(new ApiResponse(200, result, "new user registered"));
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
});

// login existing user
module.exports.userLogin = AsyncHandler(async (req, res) => {
  try {
    // console.log("##########START############################");
    let data = req.body;
    //find the user
    let user = await userService.getUserByEmail(data.email);
    if (user === "FAILURE") {
      userLogger.error(
        `userLogin -> $USER_EMAIL=[${data.email}] : Invalid user email`
      );
      throw new ApiError(401, "Invalid user email");
    }
    //password check
    const isPasswordValid = await isPasswordCorrect(
      data.password,
      user.password
    );
    if (!isPasswordValid) {
      userLogger.error(
        `userLogin -> $USER_EMAIL=[${data.email}] : Invalid user credentials`
      );
      throw new ApiError(401, "Invalid user credentials");
    }
    //set access and referesh token
    let tokens = await generateAccessAndRefreshTokens("user", user.user_id);
    if (tokens === "FAILURE") {
      userLogger.error(
        `userLogin -> $USER_EMAIL=[${data.email}] : Token error`
      );
      throw new ApiError(500, "Token error");
    }
    let accessToken = await tokens.accessToken;
    let refreshToken = await tokens.refreshToken;

    // update access token in user_detail
    user.refresh_token = refreshToken;
    const updateUserDetail = await userService.updateUserRefreshToken(user);
    if (updateUserDetail === "FAILURE") {
      userLogger.error(
        `userLogin -> $user_EMAIL=[${data.email}] : Couldnot update user refreshtoken `
      );
      throw new ApiError(500, "Couldnot update user refreshtoken ");
    }

    //send cookie
    const options = {
      httpOnly: true,
      secure: true,
    };
    delete user.password;
    delete user.refresh_token;

    userLogger.info(
      `userLogin -> $user_EMAIL=[${data.email}] : user logged In Successfully`
    );
    // console.log("##########END############################");

    return res
      .status(200)
      .cookie("userRole", "user", options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, user, "user logged In Successfully"));
  } catch (error) {
    throw error;
  }
});

// logout existing user
module.exports.userLogout = AsyncHandler(async (req, res) => {
  try {
    // console.log("##########START############################");
    let { user_id: user_authid } = req.auth;
    let userid = parseInt(req.params.userid);

    if (user_authid !== userid) {
      userLogger.error(
        ` userLogout-> $USER_ID=[${user_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }
    let data = await userService.getUserById(user_authid);
    if (data == "FAILURE") {
      ownerLogger.error(
        `userLogout -> $USER_ID=[${owner_authid}] : user_id invalid`
      );
      throw new ApiError(401, "user_id invalid");
    }

    data.refresh_token = null;
    let updatedResult = await userService.updateUserRefreshToken(data);
    if (updatedResult == "FAILURE") {
      userLogger.error(
        `userLogout -> $USER_ID=[${user_authid}] : cannot remove user refreshtoken`
      );
      throw new ApiError(500, "cannot remove user refreshtoken");
    }
    userLogger.info(
      `userLogout -> $USER_ID=[${user_authid}] : user logged Out successfully`
    );
    // console.log("##########END############################");
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("userRole", options)
      .clearCookie("accessToken", options)
      .json(new ApiResponse(200, {}, "user logged Out successfully"));
  } catch (error) {
    throw error;
  }
});

// new booking
module.exports.createNewBooking = AsyncHandler(async (req, res) => {
  try {
    console.log("##########START############################");
    let { user_id: user_authid } = req.auth;
    let data = req.body;
    // data ={hotel_id,user_id,no_rooms,total_booking_amount,checkin_date,checkout_date,booking_status:BOOKED,bookingDescriptionList:[{booking_id,room_id,booking_amount_room,checkin_date,checkout_date},...]}

    if (user_authid !== data.user_id) {
      userLogger.error(
        ` createNewBooking-> $USER_ID=[${user_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }
    console.log("##############################");

    let bookingData = {
      hotel_id: data.hotel_id,
      user_id: data.user_id,
      no_rooms: data.no_rooms,
      total_booking_amount: data.total_booking_amount,
      checkin_date: data.checkin_date,
      checkout_date: data.checkout_date,
      booking_status: "BOOKED",
    };
    console.log(bookingData);
    let bookingResult = await bookingService.addNewBookingDetail(bookingData);
    if (bookingResult === "FAILURE") {
      userLogger.error(
        ` createNewBooking-> $USER_ID=[${user_authid}] : couldnot add new booking to database`
      );
      throw new ApiError(500, "couldnot add new booking to database");
    }
    console.log("##############################");

    let output = [];
    for (let bookingDescriptionItem of data.bookingDescriptionList) {
      bookingDescriptionItem.booking_id = bookingResult.booking_id;
      let bookingDescriptionData =
        await bookingDescriptionService.addNewBookingDescription(
          bookingDescriptionItem
        );

      if (bookingDescriptionData === "FAILURE") {
        userLogger.error(
          ` createNewBooking-> $USER_ID=[${user_authid}] : Couldnot add booking description`
        );
        throw new ApiError(500, "Couldnot add booking description ");
      }
      output.push(bookingDescriptionData);
    }

    userLogger.error(
      ` createNewBooking-> $USER_ID=[${user_authid}] : Booking successful`
    );
    console.log("##############END####################");
    return res
      .status(200)
      .json(
        new ApiResponse(200, [bookingResult, ...output], "Booking successful")
      );
  } catch (error) {
    throw error;
  }
});
