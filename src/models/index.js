const userDetailModel = require("./user_detail.model");
const hotelOwnerDetailModel = require("./hotel_owner_detail.model");
const hotelDetailModel = require("./hotel_detail.model");
const hotelAmenityModel = require("./hotel_amenity.model");
const roomDetailModel = require("./room_detail.model");
const reviewDetailModel = require("./review_detail.model");
const adminModel = require("./admin.model");
const bookingDescriptionModel = require("./booking_description.model");
const bookingDetailModel = require("./booking_detail.model");

const models = {};
models.userDetailModel = userDetailModel;
models.hotelDetailModel = hotelDetailModel;
models.hotelOwnerDetailModel = hotelOwnerDetailModel;
models.hotelAmenityModel = hotelAmenityModel;
models.roomDetailModel = roomDetailModel;
models.adminModel = adminModel;
models.reviewDetailModel = reviewDetailModel;
models.bookingDescriptionModel = bookingDescriptionModel;
models.bookingDetailModel = bookingDetailModel;

module.exports = models;
