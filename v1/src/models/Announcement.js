const { DataTypes } = require('sequelize');
const { sequelize } = require('../loaders/database');
const logger = require('../scripts/logger/Announcement');

const Announcement = sequelize.define('Announcement', {
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

Announcement.afterCreate((announcement) => {
    logger.log({
        level: "info",
        message: announcement,
    });
});


module.exports = Announcement;
