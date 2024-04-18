const { DataTypes } = require("sequelize");
const db = require("../database/db");

const Hotel = db.define(
    "hotel_detail",
    {
        hotel_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        hotel_name: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.TEXT, allowNull: false },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hotel_owner_detail', // Name of the referenced table
                key: 'owner_id' // Name of the referenced column
            }
        },
    },
    {
        freezeTableName: true, // Freeze table name to prevent Sequelize from altering it
        timestamps: false, // Disable createdAt and updatedAt fields
    }
);

module.exports = Hotel;
