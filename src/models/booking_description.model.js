const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");
const models = require("./index");

const BookingDescription = db.define(
  "booking_description",
  {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "booking_detail",
        key: "booking_id",
      },
    },
    room_id: {
      type: DataTypes.INTEGER,

      references: {
        model: "room_detail",
        key: "room_id",
      },
    },
    booking_amount_room: {
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
  },
  {
    freezeTableName: true,
    timestamps: false,
    tableName: "booking_description",
  }
);

// BookingDescription.belongsTo(BookingDetail, {
//   foreignKey: "booking_id",
//   targetKey: "booking_id",
// });

// BookingDescription.belongsTo(RoomDetail, {
//   foreignKey: "room_id",
//   targetKey: "room_id",
// });

module.exports = BookingDescription;

// DROP TABLE IF EXISTS booking_description;
// CREATE TABLE IF NOT EXISTS booking_description (
// 	uid INT PRIMARY KEY AUTO_INCREMENT,
//     booking_id INT NOT NULL,
//     room_id INT,
// 	booking_amount_room INT,
//     checkin_date Date,
//     checkout_date Date,
//     CONSTRAINT  FK_bd_bd FOREIGN KEY (booking_id) REFERENCES booking_detail(booking_id),
//     CONSTRAINT  FK_bd_rd FOREIGN KEY (room_id) REFERENCES room_detail(room_id)
// 	);
