const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const ownerLogger = require("../../../logger/ownerLogger/index");

const {
  encryptPassword,
  isPasswordCorrect,
} = require("../../utils/bcryptMethods");
const { generateAccessAndRefreshTokens } = require("../../utils/generateToken");
const hotelOwnerService = require("../../services/hotel/hotel_owner_detail.service");

// register new hotel owner
module.exports.ownerRegister = AsyncHandler(async (req, res) => {
  try {
    // console.log("##########START############################");
    let data = req.body;
    // check if owner already present or not
    // encrypt the password
    data.password = await encryptPassword(data.password);
    // create entry in db
    let result = await hotelOwnerService.addNewHotelOwner(data);
    if (result == "FAILURE") {
      ownerLogger.error(
        `ownerRegister -> $OWNER_EMAIL=[${data.email}] : Couldnot add new hotelowner to database `
      );
      throw new ApiError(500, "Couldnot add new hotelowner to database ");
    }
    // remove password and refreshtoken  from response
    delete result.password;
    delete result.refresh_token;

    ownerLogger.info(
      `ownerRegister -> $OWNER_EMAIL=[${data.email}] : new hotelowner registered`
    );
    // console.log("##########END############################");
    return res
      .status(200)
      .json(new ApiResponse(200, result, "new hotelowner registered"));
  } catch (error) {
    throw error;
  }
});

// login existing hotelowner
module.exports.ownerLogin = AsyncHandler(async (req, res) => {
  try {
    // console.log("##########START############################");
    let data = req.body;
    //find the owner
    let owner = await hotelOwnerService.getHotelOwnerByEmail(data.email);
    if (owner === "FAILURE") {
      ownerLogger.error(
        `ownerLogin -> $OWNER_EMAIL=[${data.email}] : Invalid owner email`
      );
      throw new ApiError(401, "Invalid owner email");
    }
    //password check
    const isPasswordValid = await isPasswordCorrect(
      data.password,
      owner.password
    );
    if (!isPasswordValid) {
      ownerLogger.error(
        `ownerLogin -> $OWNER_EMAIL=[${data.email}] : Invalid owner credentials`
      );
      throw new ApiError(401, "Invalid owner credentials");
    }
    //set access and referesh token
    let tokens = await generateAccessAndRefreshTokens("owner", owner.owner_id);
    if (tokens === "FAILURE") {
      ownerLogger.error(
        `ownerLogin -> $OWNER_EMAIL=[${data.email}] : Token error`
      );
      throw new ApiError(500, "Token error");
    }
    let accessToken = await tokens.accessToken;
    let refreshToken = await tokens.refreshToken;

    // update access token in owner_detail
    owner.refresh_token = refreshToken;
    const updateOwnerDetail =
      await hotelOwnerService.updateHotelOwnerRefreshToken(owner);
    if (updateOwnerDetail === "FAILURE") {
      ownerLogger.error(
        `ownerLogin -> $OWNER_EMAIL=[${data.email}] : Couldnot update owner refreshtoken `
      );
      throw new ApiError(500, "Couldnot update owner refreshtoken ");
    }

    //send cookie
    const options = {
      httpOnly: true,
      secure: true,
    };
    delete owner.password;
    delete owner.refresh_token;

    ownerLogger.info(
      `ownerLogin -> $OWNER_EMAIL=[${data.email}] : Owner logged In Successfully`
    );
    // console.log("##########END############################");

    return res
      .status(200)
      .cookie("userRole", "owner", options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, owner, "Owner logged In Successfully"));
  } catch (error) {
    throw error;
  }
});

//  logout existing hotelowner
module.exports.ownerLogout = AsyncHandler(async (req, res) => {
  try {
    console.log("##########START############################");
    let { owner_id: owner_authid } = req.auth;
    let ownerid = parseInt(req.params.ownerid);

    if (owner_authid !== ownerid) {
      console.log("#############################");
      userLogger.error(
        ` ownerLogout-> $OWNER_ID=[${user_authid}] : unauthorized access`
      );
      throw new ApiError(401, "unauthorized access");
    }
    let data = await hotelOwnerService.getHotelOwnerById(owner_authid);
    if (data == "FAILURE") {
      ownerLogger.error(
        `ownerLogout -> $OWNER_ID=[${owner_authid}] : owner_id invalid`
      );
      throw new ApiError(401, "owner_id invalid");
    }

    data.refresh_token = null;
    let updatedResult = await hotelOwnerService.updateHotelOwnerRefreshToken(
      data
    );
    if (updatedResult == "FAILURE") {
      ownerLogger.error(
        `ownerLogout -> $OWNER_ID=[${owner_authid}] : cannot remove owner refreshtoken`
      );
      throw new ApiError(500, "cannot remove owner refreshtoken");
    }
    ownerLogger.info(
      `ownerLogout -> $OWNER_ID=[${owner_authid}] : owner logged Out successfully`
    );
    console.log("##########END############################");
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("userRole", options)
      .clearCookie("accessToken", options)
      .json(new ApiResponse(200, {}, "owner logged Out successfully"));
  } catch (error) {
    throw error;
  }
});
