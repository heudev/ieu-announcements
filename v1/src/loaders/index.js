const { initDb } = require("./database");
const { scrape } = require("./scraping");

module.exports = async () => {
    await initDb();
    await scrape();
};