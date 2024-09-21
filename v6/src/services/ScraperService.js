const HTMLParser = require('node-html-parser');
const announcementLogger = require('../scripts/logger/Announcement');
const newsLogger = require('../scripts/logger/News');
const sflAnnouncementLogger = require('../scripts/logger/SflAnnouncement');
const oimAnnouncementLogger = require('../scripts/logger/OimAnnouncement');
const fecsAnnouncementLogger = require('../scripts/logger/FecsAnnouncement');
const dmAnnouncementLogger = require('../scripts/logger/DmAnnouncement');

class ScraperService {
    ieuAnnouncements = async (lang) => {
        if (lang !== 'tr' && lang !== 'en') {
            throw new Error("Invalid language");
        }
        try {
            const response = await fetch(`https://www.ieu.edu.tr/${lang}/announcements/type/all`);
            const body = await response.text();
            const root = HTMLParser.parse(body);
            const announcementBox = root.querySelector("#page-top > main > div.col-lg-10.offset-lg-1.pagecontent-top.mb-5.pt-5.pb-5.mainpage > div > div.col-lg-9.text-primary-color-content.border-left-2px-primary > div:nth-child(3) > div.card-body");

            const announcements = announcementBox.querySelectorAll('a').map(announcement => {
                const updated = announcement.querySelector('p.media-body').childNodes[3].textContent.trim();
                const title = announcement.querySelector('p.media-body').childNodes[2].textContent.trim() + (updated && " " + updated);
                const link = announcement.getAttribute('href');
                const date = announcement.querySelector('.d-block.text-orange-color').text.trim();
                return { title, link, date }
            });
            return announcements;

        } catch (error) {
            console.error(`Error fetching or parsing ${lang} announcements:`, error);
            announcementLogger.log({ level: "error", message: error });
            return [];
        }
    };

    ieuNews = async (lang) => {
        if (lang !== 'tr' && lang !== 'en') {
            throw new Error("Invalid language");
        }
        try {
            const response = await fetch(`https://www.ieu.edu.tr/${lang}/news/type/all`);
            const body = await response.text();
            const root = HTMLParser.parse(body);

            const allNews = root.querySelectorAll('div.row > div.col-lg-12 > div.shadow > div.card-body').map(news => news.parentNode);

            const news = allNews.map(news => {
                const imageUrl = news.querySelector('div.col-12.col-lg-3 img')?.getAttribute('src');
                const title = news.querySelector('h3.mb-3.text-primary-color')?.text.trim();
                const description = news.querySelector('div.inside-p-lh p')?.text.trim();
                const readMoreLink = news.querySelector('a.btn.newsbtn')?.getAttribute('href');
                return { title, description, imageUrl, readMoreLink };
            });

            return news;

        } catch (error) {
            console.error(`Error fetching or parsing ${lang} news:`, error);
            newsLogger.log({ level: "error", message: error });
            return [];
        }
    };

    ieuSflAnnouncements = async (lang) => {
        if (lang !== 'tr' && lang !== 'en') {
            throw new Error("Invalid language");
        }
        try {
            const response = await fetch(`https://sfl.ieu.edu.tr/${lang}/announcements/type/all`);
            const body = await response.text();
            const root = HTMLParser.parse(body);
            const announcementBox = root.querySelector("body > main > div:nth-child(4) > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.text-primary-color-content > div:nth-child(3) > div.card-body");
            const announcements = announcementBox.querySelectorAll('a').map(announcement => {
                const updated = announcement.querySelector('p.media-body').childNodes[3].textContent.trim();
                const title = announcement.querySelector('p.media-body').childNodes[2].textContent.trim() + (updated && " " + updated);
                const link = announcement.getAttribute('href');
                const date = announcement.querySelector('.d-block.text-orange-color').text.trim();
                return { title, link, date }
            });

            return announcements;

        } catch (error) {
            console.error(`Error fetching or parsing ${lang} announcements:`, error);
            sflAnnouncementLogger.log({ level: "error", message: error });
            return [];
        }
    };

    ieuOimAnnouncements = async (lang) => {
        if (lang !== 'tr' && lang !== 'en') {
            throw new Error("Invalid language");
        }
        try {
            const response = await fetch(`https://oim.ieu.edu.tr/${lang}/announcements/type/all`);
            const body = await response.text();
            const root = HTMLParser.parse(body);
            const announcementBox = root.querySelector("body > main > div:nth-child(3) > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.text-primary-color-content > div:nth-child(3) > div.card-body");
            const announcements = announcementBox.querySelectorAll('a').map(announcement => {
                const updated = announcement.querySelector('p.media-body').childNodes[3].textContent.trim();
                const title = announcement.querySelector('p.media-body').childNodes[2].textContent.trim() + (updated && " " + updated);
                const link = announcement.getAttribute('href');
                const date = announcement.querySelector('.d-block.text-orange-color').text.trim();
                return { title, link, date }
            });

            return announcements;

        } catch (error) {
            console.error(`Error fetching or parsing ${lang} announcements:`, error);
            oimAnnouncementLogger.log({ level: "error", message: error });
            return [];
        }
    };

    ieuFecsAnnouncements = async (lang) => {
        if (lang !== 'tr' && lang !== 'en') {
            throw new Error("Invalid language");
        }
        try {
            const response = await fetch(`https://fecs.ieu.edu.tr/${lang}/announcements/type/all`);
            const body = await response.text();
            const root = HTMLParser.parse(body);
            const announcementBox = root.querySelector("body > main > div:nth-child(4) > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.text-primary-color-content > div:nth-child(3) > div.card-body");
            const announcements = announcementBox.querySelectorAll('a').map(announcement => {
                const updated = announcement.querySelector('p.media-body').childNodes[3].textContent.trim();
                const title = announcement.querySelector('p.media-body').childNodes[2].textContent.trim() + (updated && " " + updated);
                const link = announcement.getAttribute('href');
                const date = announcement.querySelector('.d-block.text-orange-color').text.trim();
                return { title, link, date }
            });

            return announcements;

        } catch (error) {
            console.error(`Error fetching or parsing ${lang} announcements:`, error);
            fecsAnnouncementLogger.log({ level: "error", message: error });
            return [];
        }
    };

    ieuDmAnnouncements = async (lang) => {
        if (lang !== 'tr' && lang !== 'en') {
            throw new Error("Invalid language");
        }
        try {
            const response = await fetch(`https://dm.ieu.edu.tr/${lang}/announcements/type/all`);
            const body = await response.text();
            const root = HTMLParser.parse(body);
            const announcementBox = root.querySelector("body > main > div:nth-child(3) > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.text-primary-color-content > div:nth-child(3) > div.card-body");
            const announcements = announcementBox.querySelectorAll('a').map(announcement => {
                const updated = announcement.querySelector('p.media-body').childNodes[3].textContent.trim();
                const title = announcement.querySelector('p.media-body').childNodes[2].textContent.trim() + (updated && " " + updated);
                const link = announcement.getAttribute('href');
                const date = announcement.querySelector('.d-block.text-orange-color').text.trim();
                return { title, link, date }
            });

            return announcements;

        } catch (error) {
            console.error(`Error fetching or parsing ${lang} announcements:`, error);
            dmAnnouncementLogger.log({ level: "error", message: error });
            return [];
        }
    };
}

module.exports = new ScraperService();