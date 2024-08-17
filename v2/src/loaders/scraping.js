const Announcement = require("../controllers/Announcement");
const SflAnnouncement = require("../controllers/SflAnnouncement");
const News = require("../controllers/News");

const scrape = async () => {
    try {
        await Announcement.check();
    } catch (error) {
        console.error("Error in Announcement check:", error);
    }

    try {
        await SflAnnouncement.check();
    } catch (error) {
        console.error("Error in SflAnnouncement check:", error);
    }

    try {
        await News.check();
    } catch (error) {
        console.error("Error in News check:", error);
    }
};

setInterval(scrape, 1000 * process.env.SCRAPING_INTERVAL || 60);

module.exports = { scrape };