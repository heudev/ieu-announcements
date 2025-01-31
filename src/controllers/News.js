const httpStatus = require('http-status');
const { TurkishNewsService, EnglishNewsService } = require('../services/NewsService');
const ScraperService = require('../services/ScraperService');
const { sendTelegramMessage } = require('../services/TelegramService');

class News {
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
            const newsList = await ScraperService.ieuNews(this.#lang);
            for (const news of newsList) {
                const exists = await this.#service.exists({
                    title: news.title,
                    readMoreLink: news.readMoreLink,
                });
                if (!exists) {
                    await this.#service.save(news);
                    const title = this.#lang === 'tr' ? 'IEU Haber' : 'IEU News';
                    await sendTelegramMessage(
                        this.#chatId,
                        `🔸<u><b>${title}</b></u>\n\n🔻<b>${news.title}</b>\n\n💢${news.description}\n\n${news.readMoreLink}`
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
            const news = await this.#service.find({})
                .select('title description imageUrl readMoreLink')
                .sort({ createdAt: 1 });

            res.status(httpStatus.OK).json(news);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Failed to fetch ${this.#lang} news` });
        }
    }
}

const TurkishNewsController = new News(TurkishNewsService, 'tr', process.env.TELEGRAM_CHAT_ID_NEWS_TURKISH);
const EnglishNewsController = new News(EnglishNewsService, 'en', process.env.TELEGRAM_CHAT_ID_NEWS_ENGLISH);

module.exports = {
    TurkishNewsController,
    EnglishNewsController
}