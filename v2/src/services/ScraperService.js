const HTMLParser = require('node-html-parser');

class ScraperService {
    ieuAnnouncements = async () => {
        try {
            const response = await fetch('https://www.ieu.edu.tr/tr/announcements/type/all');
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
            console.error("Error fetching or parsing announcements:", error);
            return [];
        }
    };

    ieuNews = async () => {
        try {
            const response = await fetch('https://www.ieu.edu.tr/tr/news/type/all');
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
            console.error("Error fetching or parsing news:", error);
            return [];
        }
    };

    ieuSflAnnouncements = async () => {
        try {
            const response = await fetch('https://sfl.ieu.edu.tr/tr/announcements/type/all');
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
            console.error("Error fetching or parsing announcements:", error);
            return [];
        }
    };
}

module.exports = new ScraperService();