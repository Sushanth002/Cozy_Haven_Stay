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
      allowNull: false,
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
