const { DataTypes } = require('sequelize');
const { sequelize } = require('../loaders/database');
const logger = require('../scripts/logger/SflAnnouncement');

const SflAnnouncement = sequelize.define('SflAnnouncement', {
    title: {
        type: DataTypes.STRING,
    },
    link: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true,
    updatedAt: false,
});

SflAnnouncement.afterCreate((announcement) => {
    logger.log({
        level: "info",
        message: announcement,
    });
});

module.exports = SflAnnouncement;
