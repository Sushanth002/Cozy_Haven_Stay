const { DataTypes } = require("sequelize");
const db = require("../database/db");
const Hotel = require("./hotel.model");

const Room = db.define(
    "room_detail",
    {
        room_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        room_size: { type: DataTypes.INTEGER },
        bed_size: { type: DataTypes.ENUM('Single', 'Double', 'King'), allowNull: false },
        max_people_accomodate: { type: DataTypes.INTEGER },
        base_fare: { type: DataTypes.INTEGER },
        ac_non_ac: { type: DataTypes.BOOLEAN },
        hotel_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
        freezeTableName: true, // Freeze table name to prevent Sequelize from altering it
        timestamps: false // Disable createdAt and updatedAt fields
    }
);

// Define foreign key constraint
Room.belongsTo(Hotel, { foreignKey: 'hotel_id', onDelete: 'CASCADE' });

module.exports = Room;
