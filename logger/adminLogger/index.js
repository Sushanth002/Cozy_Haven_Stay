const winston = require("winston");
const MySQLTransport = require("winston-mysql");
require("dotenv").config();
const { logFormat, admin_mysql_options } = require("../util");

const { combine, timestamp, label } = winston.format;

const adminLogger = winston.createLogger({
  level: "info",
  // format: winston.format.json(),
  format: combine(label({ label: "admin_service" }), timestamp(), logFormat),
  defaultMeta: { service: "admin-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./logs/adminlogs/admin_error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./logs/adminlogs/admin_allLogs.log",
      level: "info",
    }),
    new MySQLTransport(admin_mysql_options),
  ],
});

module.exports = adminLogger;
