const httpStatus = require('http-status');
const SflAnnouncementService = require('../services/SflAnnouncementService');
const ScraperService = require('../services/ScraperService');
const { sendTelegramMessage } = require('../services/TelegramService');

class SflAnnouncement {
    async check() {
        try {
            const announcements = await ScraperService.ieuSflAnnouncements();
            for (const announcement of announcements) {
                const exists = await SflAnnouncementService.exists({
                    title: announcement.title,
                    link: announcement.link,
                    date: announcement.date,
                });
                if (!exists) {
                    await SflAnnouncementService.save(announcement);
                    await sendTelegramMessage(`🔸<u><b>SFL Duyuru</b></u>\n\n💢${announcement.title}\n\n🔹${announcement.date}\n\n${announcement.link}`);
                }
            }
        } catch (error) {
            console.log('Failed to fetch announcements or news' + error);
        }
    }

    async index(req, res) {
        try {
            const announcements = await SflAnnouncementService.findAll({
                attributes: ['title', 'link', 'date'],
                order: [['createdAt', 'ASC']]
            });
            res.status(httpStatus.OK).json(announcements);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch announcements' });
        }
    }
}

module.exports = new SflAnnouncement();