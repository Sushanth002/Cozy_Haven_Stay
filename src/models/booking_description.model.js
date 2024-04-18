const { DataTypes } = require("sequelize");
const db = require("../database/db");
const Booking = require("./booking.model");
const Room = require("./room.model");

const BookingDescription = db.define(
    "booking_description",
    {
        uid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        booking_id: { type: DataTypes.INTEGER, allowNull: false },
        room_id: { type: DataTypes.INTEGER, allowNull: false },
        booking_amount_room: { type: DataTypes.INTEGER },
        checkin_date: { type: DataTypes.DATE },
        checkout_date: { type: DataTypes.DATE }
    },
    {
        freezeTableName: true, // Freeze table name to prevent Sequelize from altering it
        timestamps: false // Disable createdAt and updatedAt fields
    }
);

// Define foreign key constraints
BookingDescription.belongsTo(Booking, { foreignKey: 'booking_id', onDelete: 'CASCADE' });
BookingDescription.belongsTo(Room, { foreignKey: 'room_id', onDelete: 'CASCADE' });

module.exports = BookingDescription;
//-------------------------------------------------------------------------------------------------------------------------------------------------
// const { Model } = require("sequelize");
// const db = require("../database/db");
// const Booking = require("./booking.model");
// const Room = require("./room.model");

// class BookingDescription extends Model {}

// BookingDescription.init(
//     {
//         uid: { type: db.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//         booking_id: { type: db.Sequelize.INTEGER, allowNull: false },
//         room_id: { type: db.Sequelize.INTEGER, allowNull: false },
//         booking_amount_room: { type: db.Sequelize.INTEGER },
//         checkin_date: { type: db.Sequelize.DATE },
//         checkout_date: { type: db.Sequelize.DATE }
//     },
//     {
//         sequelize: db,
//         modelName: "booking_description",
//         freezeTableName: true,
//         timestamps: false
//     }
// );

// // Define foreign key constraints
// BookingDescription.belongsTo(Booking, { foreignKey: "booking_id", onDelete: "CASCADE" });
// BookingDescription.belongsTo(Room, { foreignKey: "room_id", onDelete: "CASCADE" });

// module.exports = BookingDescription;


