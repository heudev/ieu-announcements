require("./config")();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const loaders = require("./loaders");
const { Announcement, News, SflAnnouncement, OimAnnouncement, FecsAnnouncement, DmAnnouncement } = require("./routes");

loaders();

const app = express();
app.use(helmet());
app.use(cors({
    origin: '*'
}));

app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>IEU Announcements API</title>
    </head>
    <body>
        <h1>IEU Announcements API</h1>
        
        <p>This API provides announcements and news from Izmir University of Economics.</p>

        <h2>Available Endpoints</h2>
        
        <h3>English Endpoints</h3>
        <ul>
            <li>
                <a href="/api/announcements/en">GET /api/announcements/en</a> - General announcements
            </li>
            <li>
                <a href="/api/news/en">GET /api/news/en</a> - News
            </li>
            <li>
                <a href="/api/sfl-announcements/en">GET /api/sfl-announcements/en</a> - School of Foreign Languages announcements
            </li>
            <li>
                <a href="/api/oim-announcements/en">GET /api/oim-announcements/en</a> - Student Affairs Directorate announcements
            </li>
            <li>
                <a href="/api/fecs-announcements/en">GET /api/fecs-announcements/en</a> - Faculty of Engineering announcements
            </li>
            <li>
                <a href="/api/dm-announcements/en">GET /api/dm-announcements/en</a> - Department of Mathematics announcements
            </li>
        </ul>

        <h3>Turkish Endpoints</h3>
        <ul>
            <li>
                <a href="/api/announcements/tr">GET /api/announcements/tr</a> - General announcements
            </li>
            <li>
                <a href="/api/news/tr">GET /api/news/tr</a> - News
            </li>
            <li>
                <a href="/api/sfl-announcements/tr">GET /api/sfl-announcements/tr</a> - School of Foreign Languages announcements
            </li>
            <li>
                <a href="/api/oim-announcements/tr">GET /api/oim-announcements/tr</a> - Student Affairs Directorate announcements
            </li>
            <li>
                <a href="/api/fecs-announcements/tr">GET /api/fecs-announcements/tr</a> - Faculty of Engineering announcements
            </li>
            <li>
                <a href="/api/dm-announcements/tr">GET /api/dm-announcements/tr</a> - Department of Mathematics announcements
            </li>
        </ul>

        <p><strong>Note:</strong> All announcements and news are instantly shared through our Telegram channel.<br>
        Telegram Channel: <a href="https://telegram.ieu.app" target="_blank">telegram.ieu.app</a></p>
    </body>
    </html>
    `);
});

app.use("/api/announcements", Announcement);
app.use("/api/news", News);
app.use("/api/sfl-announcements", SflAnnouncement);
app.use("/api/oim-announcements", OimAnnouncement);
app.use("/api/fecs-announcements", FecsAnnouncement);
app.use("/api/dm-announcements", DmAnnouncement);

const PORT = process.env.APP_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});