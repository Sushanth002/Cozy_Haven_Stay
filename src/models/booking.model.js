const { DataTypes } = require("sequelize");
const db = require("../database/db");
const Hotel = require("./hotel.model");
const User = require("./user.model");

const Booking = db.define(
    "booking_detail",
    {
        booking_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        hotel_id: { type: DataTypes.INTEGER, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        no_rooms: { type: DataTypes.INTEGER },
        total_booking_amount: { type: DataTypes.INTEGER },
        checkin_date: { type: DataTypes.DATE },
        checkout_date: { type: DataTypes.DATE },
        booking_status: { 
            type: DataTypes.ENUM('BOOKED', 'REFUND_PENDING', 'REFUND_APPROVED', 'REFUND_CANCELED'), 
            allowNull: false 
        }
    },
    {
        freezeTableName: true, // Freeze table name to prevent Sequelize from altering it
        timestamps: false, // Disable createdAt and updatedAt fields
    }
);

// Define foreign key constraints
Booking.belongsTo(Hotel, { foreignKey: 'hotel_id', onDelete: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Booking;
//---------------------------------------------------------------------------------------------------------------------------------------------------
// const { DataTypes } = require("sequelize");
// const db = require("../database/db");
// const Hotel = require("./hotel.model");
// const User = require("./user.model");
// const BookingDescription = require("./booking_description.model"); // Import BookingDescription model

// const Booking = db.define(
//     "booking_detail",
//     {
//         booking_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//         hotel_id: { type: DataTypes.INTEGER, allowNull: false },
//         user_id: { type: DataTypes.INTEGER, allowNull: false },
//         no_rooms: { type: DataTypes.INTEGER },
//         total_booking_amount: { type: DataTypes.INTEGER },
//         checkin_date: { type: DataTypes.DATE },
//         checkout_date: { type: DataTypes.DATE },
//         booking_status: { 
//             type: DataTypes.ENUM('BOOKED', 'REFUND_PENDING', 'REFUND_APPROVED', 'REFUND_CANCELED'), 
//             allowNull: false 
//         }
//     },
//     {
//         freezeTableName: true, // Freeze table name to prevent Sequelize from altering it
//         timestamps: false, // Disable createdAt and updatedAt fields
//     }
// );

// // Define foreign key constraints
// Booking.belongsTo(Hotel, { foreignKey: 'hotel_id', onDelete: 'CASCADE' });
// Booking.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// // Associate Booking model with BookingDescription model
// Booking.hasMany(BookingDescription, { foreignKey: 'booking_id', onDelete: 'CASCADE' });

// module.exports = Booking;

