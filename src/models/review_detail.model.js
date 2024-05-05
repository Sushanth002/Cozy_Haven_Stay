// const { Sequelize, DataTypes } = require("sequelize");
// const db = require("../config/dbconfig");
// const models = require("./index");

// const ReviewDetail = db.define(
//   "review_detail",
//   {
//     review_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     booking_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "bookin_detail",
//         key: "owner_id",
//       },
//     },
//     review: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     rating: {
//       type: DataTypes.FLOAT(2, 1),
//       allowNull: false,
//     },
//     time_stamp: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     freezeTableName: true,
//     tableName: "review_detail",
//     timestamps: false,
//   }
// );

// // ReviewDetail.belongsTo(models.bookingDetailModel, {
// //   foreignKey: "booking_id",
// // });

// module.exports = ReviewDetail;


// const { Sequelize, DataTypes } = require("sequelize");
// const db = require("../config/dbconfig");
// const models = require("./index");

// const ReviewDetail = db.define(
//   "review_detail",
//   {
//     review_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     booking_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "bookin_detail",
//         key: "booking_id",
//       },
//     },
//     review: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     rating: {
//       type: DataTypes.FLOAT(2, 1),
//       allowNull: false,
//     },
//     time_stamp: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     freezeTableName: true,
//     tableName: "review_detail",
//     timestamps: false,
//   }
// );


// module.exports = ReviewDetail;

const { DataTypes } = require("sequelize");
const db = require("../config/dbconfig");
const BookingDetail = require("./booking_detail.model");

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
        model: BookingDetail,
        key: "booking_id",
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

ReviewDetail.belongsTo(BookingDetail, {
  foreignKey: "booking_id",
});

module.exports = ReviewDetail;
