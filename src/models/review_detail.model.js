const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");
const models = require("./index");

const ReviewDetail = db.define(
  "review_detail",
  {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "bookin_detail",
        key: "owner_id",
      },
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT(2, 1),
      allowNull: false,
    },
    time_stamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    tableName: "review_detail",
    timestamps: false,
  }
);

// ReviewDetail.belongsTo(models.Booking_detailModel, {
//   foreignKey: "booking_id",
// });

module.exports = ReviewDetail;

// DROP TABLE IF EXISTS review_detail;
// CREATE TABLE IF NOT EXISTS review_detail (
// 	review_id INT PRIMARY KEY AUTO_INCREMENT,
//     booking_id INT NOT NULL,
//     review TEXT,
//     rating FLOAT(2,1),
//     time_stamp DATETIME DEFAULT CURRENT_TIMESTAMP,
//     CONSTRAINT FK_rd_bd FOREIGN KEY (booking_id) REFERENCES booking_detail(booking_id)
// 	);
