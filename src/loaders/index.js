const { connectDB } = require("./database");
const { scrape } = require("./scraping");

module.exports = async () => {
    await connectDB();
    await scrape();
};