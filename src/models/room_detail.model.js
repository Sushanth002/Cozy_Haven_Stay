const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");
const models = require("./index");

const RoomDetail = db.define(
  "room_detail",
  {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bed_size: {
      type: DataTypes.ENUM("SINGLE_BED", "DOUBLE_BED", "KINGSIZE_BED"),
      allowNull: false,
    },
    max_people_accomodate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    base_fare: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ac_non_ac: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "hotel_detail",
        key: "hotel_id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    tableName: "room_detail",
  }
);

// RoomDetail.belongsTo(models.hotelDetailModel, { foreignKey: "hotel_id" });

module.exports = RoomDetail;
