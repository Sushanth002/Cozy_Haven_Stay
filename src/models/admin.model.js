const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");

const Admin = db.define(
  "admin",
  {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    admin_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    admin_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin_phoneno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    tableName: "admin",
  }
);

module.exports = Admin;

// **************************************************************************
// DROP TABLE IF EXISTS admin;

// CREATE TABLE IF NOT EXISTS admin (
// 	admin_id INT PRIMARY KEY AUTO_INCREMENT,
//     admin_name VARCHAR(255) NOT NULL ,
//     admin_email VARCHAR(255) NOT NULL UNIQUE ,
//     admin_password VARCHAR(255) NOT NULL ,
//     admin_phoneno VARCHAR(255) NOT NULL UNIQUE,
//     refresh_token VARCHAR(255) UNIQUE
// 	);

// INSERT INTO admin (admin_name, admin_email, admin_password, admin_phoneno) VALUES ("testadmin1", "testadmin1@gmail.com", "testadminpassword1", "testadminphoneno1");
// INSERT INTO admin (admin_name, admin_email, admin_password, admin_phoneno) VALUES ("testadmin2", "testadmin2@gmail.com", "testadminpassword2", "testadminphoneno2");
// $2b$10$vxj.bwwXMquUJuV2ZqtqLOQwsadUxdKhldJsURRKx1gfbK7rfDFuC
// $2b$10$YRBVeESp/rNg1JvyZpRJReQVsPfWA9XWLMp3IjZN9UIRq9vx1lSeq
