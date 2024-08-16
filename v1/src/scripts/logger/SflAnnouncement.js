const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "sfl-announcement-service" },
    transports: [
        new winston.transports.File({
            filename: "src/logs/sfl-announcement/error.log",
            level: "error",
        }),
        new winston.transports.File({
            filename: "src/logs/sfl-announcement/info.log",
            level: "info",
        }),
        new winston.transports.File({
            filename: "src/logs/sfl-announcement/combined.log",
        }),
    ],
});

module.exports = logger;
