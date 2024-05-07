const { DataTypes } = require("sequelize");
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

      references: {
        model: "hotel_detail",
        key: "hotel_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user_detail",
        key: "user_id",
      },
    },
    no_rooms: {
      type: DataTypes.INTEGER,
    },
    total_booking_amount: {
      type: DataTypes.INTEGER,
    },
    checkin_date: {
      type: DataTypes.DATEONLY,
    },
    checkout_date: {
      type: DataTypes.DATEONLY,
    },
    booking_status: {
      type: DataTypes.ENUM(
        "BOOKED",
        "REFUND_PENDING",
        "REFUND_APPROVED",
        "REFUND_CANCELED"
      ),
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "booking_detail",
  }
);

module.exports = BookingDetail;

// DROP TABLE IF EXISTS booking_detail;
// CREATE TABLE IF NOT EXISTS booking_detail (
// 	booking_id INT PRIMARY KEY AUTO_INCREMENT,
//     hotel_id INT,
//     user_id INT,
//     no_rooms INT ,
//     total_booking_amount INT,
//     checkin_date Date,
//     checkout_date Date,
//     booking_status ENUM('BOOKED', 'REFUND_PENDING','REFUND_APPROVED','REFUND_CANCELED'),
//     CONSTRAINT  FK_bd_hd FOREIGN KEY (hotel_id) REFERENCES hotel_detail(hotel_id),
//     CONSTRAINT  FK_bd_ud FOREIGN KEY (user_id) REFERENCES user_detail(user_id)
// 	);
