const httpStatus = require('http-status');
const NewsService = require('../services/NewsService');
const ScraperService = require('../services/ScraperService');
const { sendTelegramMessage } = require('../services/TelegramService');

class News {
    async check() {
        try {
            const newsList = await ScraperService.ieuNews();
            for (const news of newsList) {
                const exists = await NewsService.exists({
                    title: news.title,
                    readMoreLink: news.readMoreLink,
                });
                if (!exists) {
                    await NewsService.save(news);
                    await sendTelegramMessage(`🔸<u><b>IEU Haber</b></u>\n\n🔻<b>${news.title}</b>\n\n💢${news.description}\n\n${news.readMoreLink}`);
                }
            }
        } catch (error) {
            console.log('Failed to fetch announcements or news' + error);
        }
    }

    async index(req, res) {
        try {
            const news = await NewsService.findAll({
                attributes: ['title', 'description', 'imageUrl', 'readMoreLink'],
                order: [['createdAt', 'ASC']]
            });
            res.status(httpStatus.OK).json(news);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch news' });
        }
    }
}

module.exports = new News();