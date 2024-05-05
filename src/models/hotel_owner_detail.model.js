const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");
const models = require("./index");

const HotelOwnerDetail = db.define(
  "hotel_owner_detail",
  {
    owner_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    owner_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("MALE", "FEMALE", "OTHER"),
    },
    contact_no: {
      type: DataTypes.STRING,
      unique: true,
    },
    address: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    tableName: "hotel_owner_detail",
    timestamps: false,
  }
);
// HotelOwnerDetail.hasOne(models.hotelDetailModel);

module.exports = HotelOwnerDetail;
