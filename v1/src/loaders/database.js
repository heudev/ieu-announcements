const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database/database.sqlite'),
    logging: false
});

const initDb = async () => {
    await sequelize.sync();
};

module.exports = { initDb, sequelize };