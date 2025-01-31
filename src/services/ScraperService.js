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
            const announcementBox = root.querySelector("main > div.container.my-25 > div > div.col-lg-9.text-primary-color-content.border-left-2px-primary.p-5 > div:nth-child(3) > div.card-body")
            const announcements = announcementBox.querySelectorAll('a').map(announcement => {
                const dateElement = announcement.querySelector('p strong.text-main-orange');
                const titleElement = announcement.querySelector('p:nth-of-type(2)');
                const updatedElement = titleElement.querySelector('span.text-orange');

                const date = dateElement ? dateElement.text.trim() : "Tarih bulunamadı";
                const title = titleElement ? titleElement.childNodes[0].textContent.trim() : "Başlık bulunamadı";
                const updated = updatedElement ? updatedElement.text.trim() : "";
                const link = announcement.getAttribute('href');

                return {
                    title: updated ? `${title} ${updated}` : title,
                    link,
                    date
                };
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

            const allNews = root.querySelectorAll('.card.mb-3');

            const news = allNews.map(news => {
                const imageUrl = news.querySelector('img.img-fluid')?.getAttribute('src');
                const title = news.querySelector('.col-lg-9 h3')?.text.trim();
                const description = news.querySelector('.inside-p-lh p')?.text.trim();
                const readMoreLink = news.querySelector('.col-lg-3 a')?.getAttribute('href');
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
            const announcementBox = root.querySelector("main > div:nth-child(3) > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.text-primary-color-content.shadow.bg-white.p-5.order-1.order-md-0 > div:nth-child(3) > div.card-body");

            const announcements = announcementBox.querySelectorAll('a').map(announcement => {
                const date = announcement.querySelector('strong.text-main-orange')?.text.trim();
                const titleElement = announcement.querySelectorAll('p')[1];
                let title = titleElement ? titleElement.text.trim() : "No title";

                const updatedTag = titleElement?.querySelector('span.text-orange');
                if (updatedTag && updatedTag.text.trim()) {
                    title += ` ${updatedTag.text.trim()}`;
                }

                const link = announcement.getAttribute('href');
                return { title, link, date };
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
            const announcementBox = root.querySelector("main > div:nth-child(3) > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.text-primary-color-content.shadow.bg-white.p-5.order-1.order-md-0 > div:nth-child(3) > div.card-body");

            const announcements = announcementBox.querySelectorAll('a').map(announcement => {
                const dateElement = announcement.querySelector('p strong.text-main-orange');
                const date = dateElement ? dateElement.text.trim() : "";
                const titleElement = announcement.querySelector('p:nth-of-type(2)');
                const titleText = titleElement ? titleElement.childNodes[0].textContent.trim() : "";
                const updatedElement = titleElement ? titleElement.querySelector('.text-orange') : null;
                const updated = updatedElement ? updatedElement.textContent.trim() : "";
                const title = updated ? `${titleText} ${updated}` : titleText;
                const link = announcement.getAttribute('href');
                return { title, link, date };
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
            const announcementBox = root.querySelector("main > div:nth-child(3) > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.text-primary-color-content.shadow.bg-white.p-5.order-1.order-md-0 > div:nth-child(3) > div.card-body");

            const announcements = announcementBox.querySelectorAll('a').map(announcement => {
                const dateElement = announcement.querySelector('p strong.text-main-orange');
                const date = dateElement ? dateElement.text.trim() : "";
                const titleElement = announcement.querySelector('p:nth-of-type(2)');
                const titleText = titleElement ? titleElement.childNodes[0].textContent.trim() : "";
                const updatedElement = titleElement ? titleElement.querySelector('.text-orange') : null;
                const updated = updatedElement ? updatedElement.textContent.trim() : "";
                const title = updated ? `${titleText} ${updated}` : titleText;
                const link = announcement.getAttribute('href');
                return { title, link, date };
            });

            return announcements;
        } catch (error) {
            console.error(`Error fetching or parsing ${lang} announcements:`, error);
            fecsAnnouncementLogger.log({ level: "error", message: error });
            return [];
        }
    };

    ieuDmAnnouncements = async (lang) => {
        if (lang !== "tr" && lang !== "en") {
            throw new Error("Invalid language");
        }
        try {
            const response = await fetch(`https://dm.ieu.edu.tr/${lang}/announcements/type/all`);
            const body = await response.text();
            const root = HTMLParser.parse(body);

            const announcementBox = root.querySelector("div:nth-child(3) > div > div.col-xs-12.col-sm-12.col-md-8.col-lg-9.text-primary-color-content.order-sm-1.order-lg-0.shadow.bg-white.p-5 > div:nth-child(3) > div.card-body")

            const announcements = announcementBox.querySelectorAll("a").map((announcement) => {
                const dateElement = announcement.querySelector("p strong.text-main-orange");
                const titleElement = announcement.querySelector("p:nth-of-type(2)");
                const updatedElement = titleElement.querySelector("span.text-orange");

                const date = dateElement ? dateElement.text.trim() : "Unknown date";
                const title = titleElement
                    ? titleElement.text.replace(updatedElement?.text || "", "").trim()
                    : "No title";
                const updated = updatedElement ? ` ${updatedElement.text.trim()}` : "";
                const link = announcement.getAttribute("href");

                return { title: title + updated, link, date };
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