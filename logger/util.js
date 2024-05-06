require("dotenv").config();

const winston = require("winston");
const { printf } = winston.format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const admin_mysql_options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER_ID,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
  table: "admin_logs",
  fields: {
    level: "log_level",
    label: "label",
    message: "message",
    meta: "metadata",
    timestamp: "timestamp",
  },
};
const owner_mysql_options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER_ID,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
  table: "owner_logs",
  fields: {
    level: "log_level",
    message: "message",
    label: "label",
    meta: "metadata",
    timestamp: "timestamp",
  },
};
const user_mysql_options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER_ID,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
  table: "user_logs",
  fields: {
    level: "log_level",
    label: "label",
    message: "message",
    meta: "metadata",
    timestamp: "timestamp",
  },
};

module.exports = {
  logFormat,
  admin_mysql_options,
  owner_mysql_options,
  user_mysql_options,
};
