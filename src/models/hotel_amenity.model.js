const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");
const models = require("./index");

const HotelAmenity = db.define(
  "hotel_amenity",
  {
    hotel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "hotel_detail",
        key: "hotel_id",
      },
    },
    parking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    room_service: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    swimming_pool: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fitness_center: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dining: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    tableName: "hotel_amenity",
  }
);

// HotelAmenity.belongsTo(models.hotelDetailModel, { foreignKey: "hotel_id" });

module.exports = HotelAmenity;
