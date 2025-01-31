const httpStatus = require('http-status');
const { TurkishSflAnnouncementService, EnglishSflAnnouncementService } = require('../services/SflAnnouncementService');
const ScraperService = require('../services/ScraperService');
const { sendTelegramMessage } = require('../services/TelegramService');

class SflAnnouncement {
    #service;
    #lang;
    #chatId;

    constructor(service, lang, chatId) {
        this.#service = service
        this.#lang = lang
        this.#chatId = chatId
        this.index = this.index.bind(this);
    }

    async check() {
        try {
            const announcements = await ScraperService.ieuSflAnnouncements(this.#lang);
            for (const announcement of announcements) {
                const exists = await this.#service.exists({
                    title: announcement.title,
                    link: announcement.link,
                    date: announcement.date,
                });
                if (!exists) {
                    await this.#service.save(announcement);
                    const title = this.#lang === 'tr' ? 'SFL Duyuru' : 'SFL Announcement';
                    await sendTelegramMessage(
                        this.#chatId,
                        `🔸<u><b>${title}</b></u>\n\n💢${announcement.title}\n\n🔹${announcement.date}\n\n${announcement.link}`
                    );
                }
            }
        } catch (error) {
            console.log(`Failed to fetch ${this.#lang} announcements or news` + error);
            return;
        }
    }

    async index(req, res) {
        try {
            const announcements = await this.#service.find({})
                .select('title link date')
                .sort({ createdAt: 1 });

            res.status(httpStatus.OK).json(announcements);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Failed to fetch ${this.#lang} announcements` });
        }
    }
}

const TurkishSflAnnouncementController = new SflAnnouncement(TurkishSflAnnouncementService, 'tr', process.env.TELEGRAM_CHAT_ID_SFL_ANNOUNCEMENT_TURKISH);
const EnglishSflAnnouncementController = new SflAnnouncement(EnglishSflAnnouncementService, 'en', process.env.TELEGRAM_CHAT_ID_SFL_ANNOUNCEMENT_ENGLISH);

module.exports = {
    EnglishSflAnnouncementController,
    TurkishSflAnnouncementController
}