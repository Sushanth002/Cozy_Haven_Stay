const winston = require("winston");
const MySQLTransport = require("winston-mysql");
require("dotenv").config();
const { logFormat, owner_mysql_options } = require("../util");

const { combine, timestamp, label } = winston.format;

const ownerLogger = winston.createLogger({
  level: "info",
  // format: winston.format.json(),
  format: combine(label({ label: "owner-service" }), timestamp(), logFormat),
  defaultMeta: { service: "owner-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./logs/ownerlogs/owner_error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./logs/ownerlogs/owner_allLogs.log",
      level: "info",
    }),
    new MySQLTransport(owner_mysql_options),
  ],
});

module.exports = ownerLogger;
