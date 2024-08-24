const { TurkishAnnouncementController, EnglishAnnouncementController } = require("../controllers/Announcement");
const { TurkishSflAnnouncementController, EnglishSflAnnouncementController } = require("../controllers/SflAnnouncement");
const { TurkishNewsController, EnglishNewsController } = require("../controllers/News");

const controllers = [
    { controller: TurkishAnnouncementController, name: 'Tr Announcement' },
    { controller: EnglishAnnouncementController, name: 'En Announcement' },
    { controller: TurkishSflAnnouncementController, name: 'Tr SflAnnouncement' },
    { controller: EnglishSflAnnouncementController, name: 'En SflAnnouncement' },
    { controller: TurkishNewsController, name: 'Tr News' },
    { controller: EnglishNewsController, name: 'En News' }
];

const scrape = async () => {
    for (const { controller, name } of controllers) {
        try {
            await controller.check();
        } catch (error) {
            console.error(`Error in ${name} check:`, error);
        }
    }
};

setInterval(scrape, 1000 * process.env.SCRAPING_INTERVAL || 180);

module.exports = { scrape };