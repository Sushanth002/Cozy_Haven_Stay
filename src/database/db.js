// const mysql = require('mysql2/promise');
// require('dotenv').config();

// // connection to mysql 
// const mysqlPool = mysql.createPool({
//     host: process.env.HOST,
//     port : process.env.DB_PORT,
//     user: process.env.USER_ID,
//     password: process.env.PASSWORD,
//     database: process.env.DB_NAME
// });

// module.exports = mysqlPool;

require('dotenv').config();
 
var Sequelize = require("sequelize");

var db = new Sequelize(
    process.env.DB_NAME,
    process.env.USER_ID,
    process.env.PASSWORD,
    {
        dialect: "mysql",
        host: process.env.HOST,
    }
);
module.exports = db;