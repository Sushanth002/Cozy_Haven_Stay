// const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
require("dotenv").config();

// **********MYSQL2*******************
// connection to mysql
// const mysqlPool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER_ID,
//   password: process.env.DB_USER_PASSWORD,
//   database: process.env.DB_NAME,
// });

// module.exports = mysqlPool;

// ***********************************
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_ID,
  process.env.DB_USER_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;

// try {
//   await sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }
