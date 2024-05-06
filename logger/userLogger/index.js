const winston = require("winston");
const MySQLTransport = require("winston-mysql");
require("dotenv").config();
const { logFormat, user_mysql_options } = require("../util");

const { combine, timestamp, label } = winston.format;

const userLogger = winston.createLogger({
  level: "info",
  // format: winston.format.json(),
  format: combine(label({ label: "user-service" }), timestamp(), logFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./logs/userlogs/user_error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./logs/userlogs/user_allLogs.log",
      level: "info",
    }),
    new MySQLTransport(user_mysql_options),
  ],
});

module.exports = userLogger;
