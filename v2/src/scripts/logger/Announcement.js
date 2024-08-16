const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "announcement-service" },
    transports: [
        new winston.transports.File({
            filename: "v2/src/logs/announcement/error.log",
            level: "error",
        }),
        new winston.transports.File({
            filename: "v2/src/logs/announcement/info.log",
            level: "info",
        }),
        new winston.transports.File({
            filename: "v2/src/logs/announcement/combined.log",
        }),
    ],
});

module.exports = logger;
