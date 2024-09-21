const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    ),
    defaultMeta: { service: "oim-announcement-service" },
    transports: [
        new winston.transports.File({
            filename: "v6/src/logs/oim-announcement/error.log",
            level: "error",
        }),
        new winston.transports.File({
            filename: "v6/src/logs/oim-announcement/info.log",
            level: "info",
        }),
        new winston.transports.File({
            filename: "v6/src/logs/oim-announcement/combined.log",
        }),
    ],
});

module.exports = logger;
