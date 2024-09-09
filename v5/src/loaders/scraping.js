const { TurkishAnnouncementController, EnglishAnnouncementController } = require("../controllers/Announcement");
const { TurkishSflAnnouncementController, EnglishSflAnnouncementController } = require("../controllers/SflAnnouncement");
const { TurkishOimAnnouncementController, EnglishOimAnnouncementController } = require("../controllers/OimAnnouncement");
const { TurkishNewsController, EnglishNewsController } = require("../controllers/News");
const { TurkishFecsAnnouncementController, EnglishFecsAnnouncementController } = require("../controllers/FecsAnnouncement");

const controllers = [
    { controller: TurkishAnnouncementController, name: 'Tr Announcement' },
    { controller: EnglishAnnouncementController, name: 'En Announcement' },
    { controller: TurkishSflAnnouncementController, name: 'Tr SflAnnouncement' },
    { controller: EnglishSflAnnouncementController, name: 'En SflAnnouncement' },
    { controller: TurkishOimAnnouncementController, name: 'Tr OimAnnouncement' },
    { controller: EnglishOimAnnouncementController, name: 'En OimAnnouncement' },
    { controller: TurkishFecsAnnouncementController, name: 'Tr FecsAnnouncement' },
    { controller: EnglishFecsAnnouncementController, name: 'En FecsAnnouncement' },
    { controller: TurkishNewsController, name: 'Tr News' },
    { controller: EnglishNewsController, name: 'En News' },
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