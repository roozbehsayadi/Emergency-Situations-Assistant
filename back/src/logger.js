const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'loginfo.log'})
    ]
});

const log = (message) => {
    logger.info(message);
}

module.exports = {
    log: log
}