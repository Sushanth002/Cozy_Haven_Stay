const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");

const UserDetail = db.define(
  "user_detail",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
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
    tableName: "user_detail",
    timestamps: false,
  }
);

module.exports = UserDetail;

// DROP TABLE IF EXISTS user_detail;

// CREATE TABLE IF NOT EXISTS user_detail (
// 	user_id INT AUTO_INCREMENT PRIMARY KEY,
//     user_name VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL ,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     gender ENUM("MALE" ,"FEMALE", "OTHER" ) CHECK (gender IN ("MALE" ,"FEMALE", "OTHER" )),
//     contact_no VARCHAR(20) UNIQUE,
//     address text ,
// 	refresh_token VARCHAR(255) UNIQUE
//     ) ;

// INSERT INTO user_detail (user_name, email, password, contact_no) VALUES ("testuser1", "testuser1@gmail.com", "testuserpassword1", "testuserphoneno1");
// INSERT INTO hotel_user_detail (user_name, email, password, contact_no) VALUES ("testuser2", "testuser2@gmail.com", "testuserpassword2", "testuserphoneno2");
