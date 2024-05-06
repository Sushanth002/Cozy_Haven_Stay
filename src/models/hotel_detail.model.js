const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");
const models = require("./index");

const HotelDetail = db.define(
  "hotel_detail",
  {
    hotel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hotel_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // hotelamenity
    parking: {
      type: DataTypes.BOOLEAN,
    },
    wifi: {
      type: DataTypes.BOOLEAN,
    },
    room_service: {
      type: DataTypes.BOOLEAN,
    },
    swimming_pool: {
      type: DataTypes.BOOLEAN,
    },
    fitness_center: {
      type: DataTypes.BOOLEAN,
    },
    dining: {
      type: DataTypes.BOOLEAN,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "hotel_owner_detail",
        key: "owner_id",
      },
    },
  },
  {
    freezeTableName: true,
    tableName: "hotel_detail",
    timestamps: false,
  }
);

// HotelDetail.belongsTo(models.hotelOwnerDetailModel);
// HotelDetail.hasMany(models.roomDetailModel);

module.exports = HotelDetail;

// **************************************************************************************
// DROP TABLE IF EXISTS hotel_detail;
// CREATE TABLE IF NOT EXISTS hotel_detail (
// 	hotel_id INT AUTO_INCREMENT PRIMARY KEY,
//     hotel_name VARCHAR(255) NOT NULL,
// 	location VARCHAR(255) NOT NULL,
//     address TEXT NOT NULL,
//     -- amenities
//     parking BOOL ,
//     wifi BOOL,
//     room_service BOOL,
//     swimming_pool BOOL,
//     fitness_center BOOL,
//     dining BOOL,
// 	owner_id INT NOT NULL,
//     CONSTRAINT FK_hd_hod FOREIGN KEY (owner_id) REFERENCES hotel_owner_detail(owner_id)
//     );

// INSERT INTO hotel_detail(hotel_name, location , address, parking, wifi, room_service, swimming_pool, fitness_center, dining, owner_id)
// 	VALUES( "testhotelbyowner1", "testlocation1", "testaddress1", TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 1);
// INSERT INTO hotel_detail(hotel_name, location , address, parking, wifi, room_service, swimming_pool, fitness_center, dining, owner_id)
// 	VALUES( "testhotelbyowner2", "testlocation2", "testaddress2", FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, 2);
