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
    refresh_token: {
      type: DataTypes.STRING,
      unique: true,
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

// DROP TABLE IF EXISTS hotel_owner_detail;

// CREATE TABLE IF NOT EXISTS hotel_owner_detail (
// 	owner_id INT AUTO_INCREMENT PRIMARY KEY,
//     owner_name VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     gender ENUM("MALE" ,"FEMALE", "OTHER" ) CHECK (gender IN ("MALE" ,"FEMALE", "OTHER" )),
//     contact_no VARCHAR(20) UNIQUE,
//     address text,
// 	refresh_token VARCHAR(255) UNIQUE
//     ) ;

// INSERT INTO hotel_owner_detail (owner_name, email, password, contact_no) VALUES ("testowner1", "testowner1@gmail.com", "testownerpassword1", "testownerphoneno1");
// INSERT INTO hotel_owner_detail (owner_name, email, password, contact_no) VALUES ("testowner2", "testowner2@gmail.com", "testownerpassword2", "testownerphoneno2");
