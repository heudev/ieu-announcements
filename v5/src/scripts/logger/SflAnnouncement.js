const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    ),
    defaultMeta: { service: "sfl-announcement-service" },
    transports: [
        new winston.transports.File({
            filename: "v5/src/logs/sfl-announcement/error.log",
            level: "error",
        }),
        new winston.transports.File({
            filename: "v5/src/logs/sfl-announcement/info.log",
            level: "info",
        }),
        new winston.transports.File({
            filename: "v5/src/logs/sfl-announcement/combined.log",
        }),
    ],
});

module.exports = logger;
