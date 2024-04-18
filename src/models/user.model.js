const sequelize = require("sequelize");
const db = require("../database/db");

const User = db.define(
    "user_detail",
    {
        user_id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        user_name: { type: sequelize.STRING, allowNull: false },
        password: { type: sequelize.STRING },
        email: { type: sequelize.STRING, unique: true },
        gender: { type: sequelize.ENUM('MALE', 'FEMALE', 'OTHER') },
        contact_no: { type: sequelize.STRING, unique: true },
        address: { type: sequelize.TEXT }
    },
    {
        // freeze table name not using *s on name
        freezeTableName: true,
        // don't use createdAt/updateAt
        timestamps: false,
    }
);

module.exports = User;
