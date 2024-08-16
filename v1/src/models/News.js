const { DataTypes } = require('sequelize');
const { sequelize } = require('../loaders/database');
const logger = require('../scripts/logger/News');

const News = sequelize.define('News', {
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    readMoreLink: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    updatedAt: false,
});

News.afterCreate((news) => {
    logger.log({
        level: "info",
        message: news,
    });
});

module.exports = News;
