const userDetailModel = require("./user_detail.model");
const hotelOwnerDetailModel = require("./hotel_owner_detail.model");
const { HotelDetailModel, RoomDetailModel } = require("./hotel_detail.model");
// const roomDetailModel = require("./room_detail.model");
const reviewDetailModel = require("./review_detail.model");
const adminModel = require("./admin.model");
const bookingDescriptionModel = require("./booking_description.model");
const bookingDetailModel = require("./booking_detail.model");

const models = {};
models.userDetailModel = userDetailModel;
models.hotelDetailModel = HotelDetailModel;
models.hotelOwnerDetailModel = hotelOwnerDetailModel;
models.roomDetailModel = RoomDetailModel;
models.adminModel = adminModel;
models.reviewDetailModel = reviewDetailModel;
models.bookingDescriptionModel = bookingDescriptionModel;
models.bookingDetailModel = bookingDetailModel;

module.exports = models;
