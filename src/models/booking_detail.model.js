const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");
const models = require("./index");

const BookingDetail = db.define(
  "booking_detail",
  {
    booking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "hotel_detail",
        key: "hotel_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user_detail",
        key: "user_id",
      },
    },
    no_rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_booking_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkin_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    checkout_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    booking_status: {
      type: DataTypes.ENUM(
        "BOOKED",
        "REFUND_PENDING",
        "REFUND_APPROVED",
        "REFUND_CANCELED"
      ),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "booking_detail",
  }
);

// BookingDetail.belongsTo(HotelDetail, {
//   foreignKey: "hotel_id",
//   targetKey: "hotel_id",
// });

// BookingDetail.belongsTo(UserDetail, {
//   foreignKey: "user_id",
//   targetKey: "user_id",
// });

module.exports = BookingDetail;
