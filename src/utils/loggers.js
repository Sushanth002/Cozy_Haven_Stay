// 1. Import winston module 
const winston = require('winston');

// 2. Logging configuration
const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: 'src/logs/user.log'
        })
    ],
  
    format: winston.format.combine(
        // winston.format.label({
        //     label: `User Login Logs`
        // }),
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
       //winston.format.printf(info => `[${info.level}] - ${info.label};  ${[info.timestamp]}; Message: ${info.message}`),
       winston.format.simple()
    )

  

};

// 3. Create logger object
const logger = winston.createLogger(logConfiguration);

module.exports = logger; 
