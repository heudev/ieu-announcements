const Announcement = require("../controllers/Announcement");
const SflAnnouncement = require("../controllers/SflAnnouncement");
const News = require("../controllers/News");

const scrape = () => {
    Announcement.check();
    SflAnnouncement.check()
    News.check();
};

setInterval(scrape, 1000 * process.env.SCRAPE_INTERVAL);

module.exports = { scrape };